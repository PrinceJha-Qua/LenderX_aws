import React, { useEffect } from 'react';

export default function Manifesto() {
  useEffect(() => {
    // Add font links dynamically
    const link1 = document.createElement('link');
    link1.rel = 'preconnect';
    link1.href = 'https://fonts.googleapis.com';
    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'true';
    const link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&display=swap';
    
    document.head.appendChild(link1);
    document.head.appendChild(link2);
    document.head.appendChild(link3);
    
    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
      document.head.removeChild(link3);
    };
  }, []);

  return (
    <div className="manifesto-wrapper">
      <style>{`
        .manifesto-wrapper {
            --bg: #F3F2EC;
            --ink: #161616;
            --red: #059669;
            --ash: #9E9B94;
            --border: 1px solid var(--ink);
            background-color: var(--bg);
            color: var(--ink);
            font-family: 'IBM Plex Mono', monospace;
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
            width: 100%;
        }

        .manifesto-wrapper .theme-dark {
            --bg: #111111;
            --ink: #F3F2EC;
            --border: 1px solid #333333;
            --ash: #666666;
            --red: #10b981;
        }

        .manifesto-wrapper .serif { font-family: 'Instrument Serif', serif; font-weight: 400; }
        .manifesto-wrapper .mono { font-family: 'IBM Plex Mono', monospace; }
        
        .manifesto-wrapper .violent-heading {
            font-size: clamp(5rem, 11vw, 15rem);
            line-height: 0.85;
            letter-spacing: -0.03em;
            margin-left: -3vw;
            margin-bottom: 4rem;
            text-transform: uppercase;
            position: relative;
            z-index: 10;
        }

        .manifesto-wrapper .dense-body {
            font-size: 1.15rem;
            line-height: 1.7;
            max-width: 62ch;
            text-align: justify;
            margin-bottom: 2.5rem;
        }

        .manifesto-wrapper .manifesto-container {
            position: relative;
            width: 100%;
        }

        .manifesto-wrapper .vertical-ticker {
            position: fixed;
            right: 0;
            top: 0;
            height: 100vh;
            width: 40px;
            border-left: var(--border);
            display: flex;
            align-items: center;
            justify-content: center;
            writing-mode: vertical-rl;
            text-transform: uppercase;
            font-size: 10px;
            letter-spacing: 0.2em;
            color: var(--red);
            z-index: 100;
            background-color: transparent;
            mix-blend-mode: difference;
        }

        .manifesto-wrapper .act {
            display: grid;
            grid-template-columns: 15vw 1fr 40px;
            min-height: 100vh;
            border-bottom: var(--border);
            background-color: var(--bg);
            color: var(--ink);
            transition: background-color 0s, color 0s;
        }

        .manifesto-wrapper .marginalia {
            border-right: var(--border);
            padding: 2rem 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .manifesto-wrapper .huge-number {
            font-size: clamp(4rem, 8vw, 10rem);
            line-height: 0.8;
            color: var(--ash);
            font-family: 'IBM Plex Mono', monospace;
        }

        .manifesto-wrapper .footnote {
            font-size: 10px;
            text-transform: uppercase;
            line-height: 1.5;
            max-width: 20ch;
        }

        .manifesto-wrapper .math-block {
            font-size: 10px;
            color: var(--red);
            margin-top: 2rem;
            border: 1px solid var(--red);
            padding: 1rem;
            line-height: 1.6;
        }

        .manifesto-wrapper .core-text {
            padding: 8rem 6rem;
            position: relative;
        }

        .manifesto-wrapper .image-container {
            width: 100%;
            max-width: 800px;
            margin: 5rem 0;
            position: relative;
            border: 1px solid var(--ink);
        }

        .manifesto-wrapper .brutalist-image {
            width: 100%;
            display: block;
            filter: grayscale(100%) contrast(150%) brightness(85%);
            min-height: 200px;
            background: var(--ink);
        }

        .manifesto-wrapper .red-overlay {
            position: absolute;
            top: 10%;
            right: -5%;
            width: 40%;
            height: 80%;
            background-color: var(--red);
            mix-blend-mode: multiply;
            z-index: 5;
        }

        .manifesto-wrapper .red-slash {
            position: absolute;
            top: -10%;
            left: 20%;
            width: 2px;
            height: 120%;
            background-color: var(--red);
            transform: rotate(15deg);
        }

        @media (max-width: 900px) {
            .manifesto-wrapper .act { grid-template-columns: 1fr 40px; display: flex; flex-direction: column; }
            .manifesto-wrapper .marginalia { border-right: none; border-bottom: var(--border); flex-direction: row; align-items: flex-end; min-height: auto; padding: 2rem; }
            .manifesto-wrapper .math-block { display: none; }
            .manifesto-wrapper .vertical-ticker { display: none; }
            .manifesto-wrapper .violent-heading { margin-left: 0; font-size: 4.5rem; }
            .manifesto-wrapper .core-text { padding: 4rem 2rem; }
        }
      `}</style>

      <div className="manifesto-container">
        
        <div className="vertical-ticker">
            LENDERX [V1.0] — REGENERATIVE ARCHITECTURE
        </div>

        {/* ACT 01: THE DISCONNECT */}
        <section className="act">
            <div className="marginalia">
                <span className="huge-number">01</span>
                <div>
                    <p className="footnote" style={{color: 'var(--red)', marginBottom: '1rem'}}>[THE GEOGRAPHY OF RISK]</p>
                    <p className="footnote ash">THE INFLATION TAX<br/>WHY BANKS CHARGE 40%</p>
                </div>
            </div>
            
            <div className="core-text">
                <h1 className="serif violent-heading">THE<br/>DISCONNECT</h1>
                
                <p className="serif dense-body">
                    A small cooperative in Sub-Saharan Africa needs $5,000 for a solar water pump. They have customers. They have revenue. They have a business.
                </p>
                <p className="serif dense-body">
                    But their local bank offers a loan at 40% APR. Why? Because the bank must price in a 20% local currency inflation premium, 10% FX devaluation risk, and 10% operational overhead. The world does not have a shortage of money; it has a shortage of accessible, inflation-resistant credit.
                </p>
                <p className="serif dense-body">
                    Between global capital and local ambition are borders, hyperinflation, broken underwriting, and intermediaries. Capital that costs 5% in New York costs 40% in Nairobi. This is the geography of risk.
                </p>

                <div className="image-container">
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" alt="Abstract Network Grid" className="brutalist-image" />
                    <div className="red-overlay"></div>
                    <div className="red-slash"></div>
                </div>

                <h2 className="serif" style={{fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1'}}>BRIDGING THE GAP</h2>
                <p className="serif dense-body">
                    If we connect them directly, global capital earns a strong yield, and local borrowers get affordable financing. The solution isn't another local bank. It's an intelligent protocol that connects stable digital money with local financial data and programmable real-world assets.
                </p>
            </div>
        </section>

        {/* ACT 02: THE STABLECOIN ARBITRAGE */}
        <section className="act theme-dark">
            <div className="marginalia">
                <span className="huge-number">02</span>
                <div>
                    <p className="footnote" style={{color: 'var(--red)', marginBottom: '1rem'}}>[THE ARBITRAGE]</p>
                    <p className="footnote ash">STABLECOINS<br/>100% FX ISOLATION</p>
                </div>
            </div>
            
            <div className="core-text">
                <h1 className="serif violent-heading" style={{color: 'var(--ink)'}}>USDC<br/><i style={{color: 'var(--red)'}}>ARBITRAGE</i></h1>
                
                <p className="mono dense-body">
                    We eliminate the 20% inflation tax by denominating the entire credit lifecycle in USDC.
                </p>
                <p className="mono dense-body">
                    When the principal is pegged to the US Dollar via stablecoins, we isolate the loan from regional currency devaluation. The lender provides USDC. The borrower receives capital via mobile money off-ramps (like M-Pesa), and their repayment obligation is mathematically pegged to USDC.
                </p>
                
  <p className="mono dense-body">
    The result? We don't have to charge an inflation premium. We can offer global lenders a 15% APY and give borrowers a 15-18% APR—literally cutting their cost of capital in half while preserving massive institutional yield.
                </p>
            </div>
        </section>

        {/* ACT 03: RWA AND ENFORCEMENT */}
        <section className="act">
            <div className="marginalia">
                <span className="huge-number">03</span>
                <div className="math-block">
                    [RWA_LOCK]<br/>
                    ASSET = TOKENIZED<br/><br/>
                    [IoT_PAYG]<br/>
                    MISSED_PMT → THROTTLE<br/><br/>
                    [LIQUIDATION]<br/>
                    CO-OP REPOSSESSES
                </div>
            </div>
            
            <div className="core-text">
                <h1 className="serif violent-heading">THE<br/>RWA ENGINE</h1>
                
                <p className="serif dense-body">
    We are not handing out unsecured cash for consumption. We finance productive, revenue-generating Real-World Assets (RWAs) like Solar Microgrids, Loom Machinery, and Agricultural Equipment.
  </p>
  
                
                <h2 className="mono" style={{margin: '3.5rem 0 1.5rem', color: 'var(--red)', fontSize: '1.5rem'}}>01 // TOKENIZED OWNERSHIP</h2>
                <p className="serif dense-body">
                    The physical asset's title is tokenized as an NFT on-chain, held in escrow by our smart contract until fully repaid. The blockchain is the unbreakable ledger of truth.
                </p>

                <h2 className="mono" style={{margin: '3.5rem 0 1.5rem', color: 'var(--red)', fontSize: '1.5rem'}}>02 // IoT LOCKOUTS & PAYG</h2>
                <p className="serif dense-body">
                    For hardware like solar pumps, we leverage Pay-As-You-Go (PAYG) IoT integrations. If a borrower defaults, the smart contract automatically throttles the asset's functionality. Because the borrower relies on the asset for daily revenue, there is massive inherent incentive to prioritize repayments. (GSMA reports show this model virtually eliminates structural default).
                </p>
            </div>
        </section>

        {/* ACT 04: RISK REDUCTION TRIFECTA */}
        <section className="act theme-dark">
            <div className="marginalia">
                <span className="huge-number">04</span>
                <div>
                    <p className="footnote" style={{color: 'var(--red)', marginBottom: '1rem'}}>[RISK REDUCTION]</p>
                    <p className="footnote ash">AI UNDERWRITING<br/>SOCIAL COLLATERAL</p>
                </div>
            </div>
            
            <div className="core-text">
                <h1 className="serif violent-heading" style={{color: 'var(--ink)'}}>RISK<br/><i style={{color: 'var(--red)'}}>MITIGATION</i></h1>
                
                <p className="mono dense-body">
                    FICO scores don't exist here. Instead, we deploy a massive Risk Reduction Trifecta to protect lender capital.
                </p>

                
  <h2 className="mono" style={{margin: '3.5rem 0 1.5rem', color: 'var(--red)', fontSize: '1.5rem'}}>01 // AI CASH-FLOW UNDERWRITING</h2>
                <p className="mono dense-body">
                    We ingest raw, alternative financial data (M-Pesa transaction histories, digital receipts) using OpenAI. We underwrite based on actual daily cash velocity and volatility, outputting a highly deterministic risk score. 
                </p>

                <h2 className="mono" style={{margin: '3.5rem 0 1.5rem', color: 'var(--red)', fontSize: '1.5rem'}}>02 // SOCIAL COLLATERAL (GRAMEEN MODEL)</h2>
                <p className="mono dense-body">
                    We lend through verified local cooperatives. If one member defaults, the cooperative's on-chain credit score drops, increasing borrowing costs for the whole village. This harnesses the Nobel-winning Grameen Bank joint-liability model, where peer-pressure yields 98%+ repayment rates.
                </p>
            </div>
        </section>

        {/* ACT 05: AWS ARCHITECTURE */}
        <section className="act">
            <div className="marginalia">
                <span className="huge-number">05</span>
                <div className="math-block">
                    [GATEWAY] → [LAMBDA]<br/><br/>
                    [STEP_FUNCTIONS] → [DYNAMODB]<br/><br/>
                    [COGNITO_AUTH]
                </div>
            </div>
            
            <div className="core-text">
                <h1 className="serif violent-heading">AWS<br/>CLOUD</h1>
                
                <p className="serif dense-body">
                    Our infrastructure is completely serverless, scalable, and enterprise-grade. LenderX runs on a robust AWS stack designed for high throughput and zero-downtime ledger tracking.
                </p>

                <div className="image-container">
                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" alt="Cloud Architecture" className="brutalist-image" />
                    <div className="red-overlay" style={{right: 'auto', left: '-5%', height: '60%', top: '20%'}}></div>
                    <div className="red-slash" style={{left: '80%'}}></div>
                </div>
                
                <h2 className="mono" style={{margin: '3.5rem 0 1.5rem', color: 'var(--red)', fontSize: '1.5rem'}}>API GATEWAY & LAMBDA</h2>
                <p className="serif dense-body">
                    Every mobile money interaction, loan application, and smart-contract settlement is orchestrated through high-concurrency AWS Lambda functions exposed via API Gateway. Zero idle servers.
                </p>

                <h2 className="mono" style={{margin: '3.5rem 0 1.5rem', color: 'var(--red)', fontSize: '1.5rem'}}>DYNAMODB & STEP FUNCTIONS</h2>
                <p className="serif dense-body">
                    AWS Step Functions manage the complex state machine of loan origination—from AI document parsing to final on-chain approval. DynamoDB serves as our lightning-fast off-chain shadow ledger.
                </p>

                <h2 className="mono" style={{margin: '3.5rem 0 1.5rem', color: 'var(--red)', fontSize: '1.5rem'}}>COGNITO & S3</h2>
                <p className="serif dense-body">
                    AWS Cognito handles JWT authentication for thousands of institutional lenders and borrowers, while S3 provides WORM (Write Once Read Many) compliant storage for verified KYC and KYC documents.
                </p>
            </div>
        </section>

        {/* ACT 06: GLOBAL IMPACT */}
        <section className="act theme-dark">
            <div className="marginalia" style={{borderRight: 'none'}}>
                <span className="huge-number">06</span>
                <p className="footnote" style={{color: 'var(--red)'}}>[TAM: $5.2 TRILLION]</p>
            </div>
            
            <div className="core-text">
                <h1 className="serif violent-heading" style={{color: 'var(--red)'}}>GLOBAL<br/>VELOCITY</h1>
                
                <p className="mono dense-body">
                    The World Bank identifies a $5.2 Trillion global credit gap for MSMEs in emerging markets. Traditional finance mathematically cannot solve this due to human overhead.
                </p>
                <p className="mono dense-body">
                    We are building the autonomous infrastructure underneath global credit. Capital already exists. Opportunity already exists. We are simply building the immutable bridge.
                </p>
                
  <p className="serif dense-body" style={{fontSize: '3rem', lineHeight: '1.1', marginTop: '6rem', color: 'var(--ink)'}}>
                    LenderX.<br/>Capital that regenerates<br/>human dignity.
                </p>
            </div>
        </section>

      </div>
    </div>
  );
}
