# Architecture Diagrams

## Career Narrative: Strategic Scale Duality

Visual representation of career evolution balancing mass-scale B2C request volume and mission-critical B2B financial processing.

```mermaid
flowchart LR
    subgraph B2C["Alelo Brasil (Consolidated 4+ Yrs)"]
        A1["Massive Scale B2C"] --> A2["+500M Req/Month"]
        A2 --> A3["+10M Users / 150k Companies"]
    end
    subgraph B2B["Trustly (Current Position)"]
        T1["High-Criticality B2B"] --> T2["Core Billing & Reconciliation"]
        T2 --> T3["Massive Batch & File Streaming"]
        T3 --> T4["+500 Peak TPS / +$100B Volume"]
    end
    B2C -.->|Career Evolution| B2B
```
