# 🌾 AGRISETU (அக்ரிசேது / एग्रीसेतु)
### "Connecting Farmers to the Right Market, Right Buyer and Right Time."

**Smart India Hackathon (SIH) Prototype**
*AI-Powered Agricultural Market Intelligence & Direct Transaction Protocol*

---

## 🌟 Overview & Problem Statement

Farmers, especially smallholders and producer organizations (FPOs), struggle with severe information asymmetry:
1. **Fragmented Market Data:** Mandi prices, arrival volumes, and historical trends are scattered.
2. **Untrusted Intermediaries:** Quoted nominal rates often hide massive transport charges, loading fees, and high commissions.
3. **Cash-Flow Distress Selling:** Lack of storage and immediate liquidity needs force farmers to sell at the lowest dip.
4. **Buyer Aggregation Deficit:** Commercial processors and wholesale buyers struggle to source consistent, graded volumes directly from farm gates.

**AGRISETU** bridges this divide by delivering a complete transaction journey:
```
MARKET INTELLIGENCE  ➔  FARMER/FPO LOT  ➔  AI BUYER MATCHING  ➔  BUYER CONTRACTS  ➔  LOGISTICS & STORAGE  ➔  ESCROW PAYMENT
```

---

## 🚀 Key Innovations & Core Architectural Principles

### 1. Two Distinct Concepts: Market vs. Buyer
- **Market / APMC Mandi:** An informational benchmark (*e.g., Coimbatore Mandi, ₹24/kg, 85 tonnes arrival, Trend ↑*). Mandis provide reference intelligence.
- **Buyer:** A commercial purchaser providing legally binding contracts (*e.g., Sri Lakshmi Foods, Needs 2,000 kg, Offers ₹27/kg, 48-hr payment, 94/100 trust score*).

### 2. WOW Moment #1: ⚠️ Highest Price ≠ Highest Profit
- **Buyer C (MegaDist):** Offers ₹29/kg (Nominal highest quote), but incurs ₹3,000 transport and high delay risk.
- **Buyer B (Sri Lakshmi Foods):** Offers ₹27/kg, but is only 24 km away (₹600 transport), 94/100 trust score, and guaranteed 48-hour payment.
- **Net In-Pocket Outcome:** **Buyer B yields ₹26,400 in pocket** vs Buyer C's ₹25,100!
- **Explainable Multi-Attribute AI:** 
  $$\text{Score} = 40\% \text{ Net Profit} + 20\% \text{ Reliability} + 10\% \text{ Payment Speed} + 10\% \text{ Transport} + 10\% \text{ Demand} + 5\% \text{ Proximity} + 5\% \text{ Zero-Risk}$$

### 3. WOW Moment #2: Smart Sell Window & Smart Split (Partial Selling)
- When a 3-day price surge is predicted (e.g., ₹24 $\rightarrow$ ₹27.50/kg) and cold storage costs ₹1.00/kg/day:
- **AI Recommendation:** **Smart Split / Partial Sell**:
  - Sell **600 kg NOW** to satisfy immediate liquidity and protect working capital.
  - Store **400 kg for 3 DAYS** in certified cold storage to capture **+₹4,000 extra upside**.

### 4. 6-Language Full i18n Protocol
Complete translation across all interfaces, buttons, alerts, and AI prompts:
- 🇬🇧 English (`en`)
- 🇮🇳 Tamil (`ta`) — *வணக்கம்! எப்போது தக்காளியை விற்க வேண்டும்?*
- 🇮🇳 Hindi (`hi`) — *नमस्ते! भाव जानो, सही समय पर बेचो।*
- 🇮🇳 Marathi (`mr`) — *नमस्कार! भाव जाणा, योग्य वेळी विका.*
- 🇮🇳 Telugu (`te`) — *ధర తెలుసుకో, సరైన సమయంలో అమ్ముకో.*
- 🇮🇳 Bengali (`bn`) — *দাম জানুন, সঠিক সময়ে বিক্রি করুন।*

### 5. Multi-Persona Support
1. **Farmer:** Low-literacy UX, voice input (🎤 Web Speech API), read-aloud (🔊 SpeechSynthesis), large tap targets, and 8-step digital lot creator.
2. **FPO Mode:** Smallholder aggregation module (e.g., Farmer 1: 500kg + Farmer 2: 700kg + Farmer 3: 800kg = **2,000 kg FPO Bulk Lot**) matching bulk institutional buyers.
3. **Buyer Portal:** Browse verified lots, submit binding bids, negotiate counter-offers, and track shipments.
4. **State Admin:** KYC approval queue, escrow verification, and audited grievance arbitration.
5. **Judge Evaluation Mode:** 10-step animated AI Decision Trace, SIH problem-to-solution mapping matrix, and live scoring weight calibration sliders.

---

## 🎬 3-Minute SIH Evaluation Demo Script

To demonstrate the full end-to-end journey in under 3 minutes:
1. Click the **🎬 START SIH DEMO** button in the top navigation.
2. **Step 1:** Select **Tamil (`ta`)** and load farmer **Rameshwar (Coimbatore, Tomato 1,000 kg)**.
3. **Step 2:** Observe APMC Mandi price discovery (Coimbatore ₹24, Pollachi ₹26, Erode ₹25).
4. **Step 3:** Review standardized Digital Lot **LOT10025** (Grade A, 12.5% moisture, Jaivik Bharat).
5. **Step 4 & 5:** Experience the **Highest Price ≠ Highest Profit** proof (Buyer B recommended over Buyer C).
6. **Step 6:** Open **Smart Sell Window** and adjust the **Smart Split simulator** (60% now / 40% later).
7. **Step 7:** View booked **Logistics Vehicle (Tata Ace, Driver Chinnasamy)**.
8. **Step 8:** Inspect the **7-Step Payment Tracker** and download the verified **Digital e-Invoice & Receipt**.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
- **Icons & UI:** Lucide Icons, Canvas Confetti
- **Voice Capabilities:** Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **Architecture:** Decoupled Context-Provider state machine, localized i18n dictionary system, explainable algorithmic decision engine.

---

## 💻 Local Development & Execution

```bash
# Clone or navigate to project directory
cd AGRI

# Install dependencies
npm install

# Start Vite Development Server
npm run dev

# Run Production Build Check
npm run build

# Run Oxlint
npm run lint
```

Open `http://localhost:5173` in your browser to experience AGRISETU.
