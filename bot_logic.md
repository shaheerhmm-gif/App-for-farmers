# Khet Bandhu - Bot Logic & Communication

## 1. Booking Flowcharts

### WhatsApp & SMS Booking Logic
```mermaid
graph TD
    Start[User sends message] --> parser{Parse Message}
    
    parser -- "TRACTOR 2 ACRE 15 DEC" --> Match[Match Pattern]
    parser -- "Unknown / Hi" --> Menu[Send Menu Options]
    
    Match --> CheckUser{Is User Reg?}
    CheckUser -- No --> RegFlow[Start Registration Flow]
    CheckUser -- Yes --> CreatePending[Create Tentative Booking]
    
    CreatePending --> ReplyConfirm[Reply: "Got it! <br> Tractor, 2 Acre, 15 Dec. <br> Reply 1 to Confirm"]
    
    ReplyConfirm --> UserReply{User Reply}
    UserReply -- "1" --> Search[Search Owners]
    UserReply -- "2" or "Cancel" --> Cancel[Cancel Request]
    
    Search --> NotifyOwners[Notify Nearby Owners]
    NotifyOwners --> Wait[Wait for Owner Accept]
    
    Wait -- Owner Accept --> Booked[Booking Confirmed]
    Wait -- Timeout/Reject --> NextOwner[Try Next Owner]
    
    Booked --> NotifyFarmer[Send Confirmation SMS]
    NextOwner -- No Owners --> NotifyFail[Send Apology SMS]
```

## 2. Message Parser Rules (Regex)

### SMS Short-Code Booking
**Pattern**:
`^\s*(TRACTOR|ROTAVATOR|CULTIVATOR|JCB)\s+(\d+(\.\d+)?)\s*(ACRE|ACRES|HOUR|HOURS)?\s+(\d{1,2}(\s[A-Za-z]+)?)\s*$`

**Explanation**:
- Group 1: Equipment Type (Case insensitive)
- Group 2: Quantity (Acres or Hours)
- Group 4: Unit (Optional, defaults to ACRE if omitted for field equipment)
- Group 5: Date (e.g., "15" or "15 Dec")

**Examples**:
- `TRACTOR 2 ACRE 15 DEC`  -> Type: TRACTOR, Qty: 2, Unit: ACRE, Date: 15 DEC
- `JCB 5 HOURS 16`         -> Type: JCB, Qty: 5, Unit: HOURS, Date: 16 (Current Month)
- `Rotavator 1.5 10 Jan`   -> Type: Rotavator, Qty: 1.5, Unit: ACRE (Default), Date: 10 Jan

### WhatsApp Quick Flows
- **Input**: "1"
  - **Action**: Trigger `flow_book_equipment`
- **Input**: "MENU"
  - **Action**: Send main menu list

## 3. Notification Templates

### Booking Confirmation (To Farmer)
**Trigger**: Owner accepts booking.

- **English**:
  "Good news! Your {equipment} booking for {qty} {unit} on {date} at {time} is CONFIRMED.
  Owner: {owner_name} ({owner_phone}). ETA: {eta_mins} mins.
  PIN: {start_pin} (Share with owner to start)"

- **Hindi**:
  "शुभ समाचार! आपकी {equipment} बुकिंग {date} को {time} बजे के लिए पक्की हो गई है।
  मालिक: {owner_name} ({owner_phone})। 
  पहुँचने का समय: {eta_mins} मिनट।
  पिन: {start_pin} (काम शुरू करने के लिए मालिक को दें)"

### New Booking Request (To Owner)
**Trigger**: System matches owner.

- **English**:
  "NEW JOB: {farmer_name} needs {equipment} for {qty} {unit} at {location} on {date}.
  Est. Earning: ₹{price_min}-₹{price_max}.
  Reply ACCEPT to confirm or REJECT to pass."

- **Hindi**:
  "नया काम: {farmer_name} को {location} पर {date} के लिए {equipment} चाहिए ({qty} {unit})।
  अनुमानित कमाई: ₹{price_min}-₹{price_max}।
  स्वीकार करने के लिए ACCEPT या मना करने के लिए REJECT रिप्लाई करें।"

### No User Found (Fallback)
**Trigger**: Parser fails.

- **English**:
  "Sorry, we couldn't understand. Reply MENU to see options or call support at 999-999-9999."

- **Hindi**:
  "क्षमा करें, हम समझ नहीं पाए। विकल्प देखने के लिए MENU रिप्लाई करें या 999-999-9999 पर कॉल करें।"
