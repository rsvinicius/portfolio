/**
 * Antifraud Financial Security Engine - Heuristic Risk Calculator
 * Pure client-side calculations per EXPERIENCE.md and interactive-widgets.md.
 */

export function calculateRisk(amount, deltaT, distance) {
    // 1. Velocity Check (60-minute sliding window)
    // P_velocity = max(0, 50 * (1 - deltaT / 60)) for deltaT < 60, else 0
    let pVelocity = 0;
    if (deltaT < 60) {
        pVelocity = Math.max(0, 50 * (1 - deltaT / 60));
    }

    // 2. Geographical Jump Penalty (Impossible travel velocity)
    // v = distance / (deltaT / 60) in km/h
    const hours = deltaT / 60;
    const v = hours > 0 ? (distance / hours) : 0;
    let pGeo = 0;
    if (v > 800) {
        pGeo = Math.min(50, 25 + (v - 800) / 40);
    }

    // 3. Amount Deviation
    // P_amount = min(30, amount / 250)
    const pAmount = Math.min(30, amount / 250);

    // 4. Exponential Damping Calibration (Human-in-the-loop)
    // Raw score: S_raw = P_velocity + P_geo + P_amount
    const rawScore = pVelocity + pGeo + pAmount;
    // Calibrated score: S = min(100, max(0, 0.8 * S_raw + 0.2 * 10))
    const score = Math.min(100, Math.max(0, 0.8 * rawScore + 0.2 * 10));

    // Decision tiers
    let tier = 'flagged';
    if (score < 40) {
        tier = 'approved';
    } else if (score >= 75) {
        tier = 'rejected';
    }

    return {
        amount,
        deltaT,
        distance,
        pVelocity,
        travelVelocity: v,
        pGeo,
        pAmount,
        rawScore,
        score: Number(score.toFixed(1)),
        tier
    };
}

export default calculateRisk;
