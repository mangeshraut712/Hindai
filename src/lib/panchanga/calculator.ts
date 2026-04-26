// Panchanga Calculator
// Simplified Hindu calendar calculations based on lunar phases

import { Panchanga, Tithi, Nakshatra, Yoga, Karana, Vara, Paksha } from "./types";
import { TITHIS, NAKSHATRAS, YOGAS, KARANAS, VARAS } from "./constants";

export class PanchangaCalculator {
  /**
   * Calculate Panchanga for a given date
   * Note: This is a simplified implementation. For production use,
   * consider using a library like 'panchanga' or integrating with
   * established Hindu calendar APIs
   */
  static calculate(date: Date): Panchanga {
    const tithi = this.calculateTithi(date);
    const nakshatra = this.calculateNakshatra(date);
    const yoga = this.calculateYoga(date);
    const karana = this.calculateKarana(date, tithi);
    const vara = this.calculateVara(date);
    const times = this.calculateSunriseSunset(date);

    return {
      date,
      tithi,
      nakshatra,
      yoga,
      karana,
      vara,
      sunrise: times.sunrise,
      sunset: times.sunset,
      moonrise: times.moonrise,
      moonset: times.moonset,
    };
  }

  /**
   * Calculate Tithi (lunar day)
   * Tithi is based on the angular distance between Sun and Moon
   */
  private static calculateTithi(date: Date): Tithi {
    // Simplified calculation based on moon phase
    const lunarCycle = 29.53059; // days in lunar month
    const knownNewMoon = new Date("2024-01-11").getTime(); // Reference new moon
    const daysSinceNewMoon = (date.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24);
    const lunarDay = ((daysSinceNewMoon % lunarCycle) + lunarCycle) % lunarCycle;

    const lunarTithi = Math.min(30, Math.floor((lunarDay / lunarCycle) * 30) + 1);
    const paksha: Paksha = lunarTithi <= 15 ? "Shukla" : "Krishna";
    const adjustedTithi = lunarTithi > 15 ? lunarTithi - 15 : lunarTithi;

    const tithiInfo =
      TITHIS.find((t) => {
        if (adjustedTithi !== 15) {
          return t.number === adjustedTithi;
        }

        return paksha === "Shukla" ? t.name === "Purnima" : t.name === "Amavasya";
      }) || TITHIS[0];

    // Calculate approximate end time (next tithi starts in ~0.94 days)
    const endTime = new Date(date.getTime() + 0.94 * 24 * 60 * 60 * 1000);
    const endTimeStr = endTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      name: tithiInfo.name,
      sanskrit: tithiInfo.sanskrit,
      number: adjustedTithi,
      paksha,
      endTime: endTimeStr,
    };
  }

  /**
   * Calculate Nakshatra (lunar mansion)
   * Nakshatra is based on Moon's position in 27 divisions of 360°
   */
  private static calculateNakshatra(date: Date): Nakshatra {
    // Simplified calculation
    const nakshatraCycle = 27.321661; // days in nakshatra cycle
    const knownNakshatra = new Date("2024-01-11").getTime(); // Reference
    const daysSince = (date.getTime() - knownNakshatra) / (1000 * 60 * 60 * 24);
    const nakshatraDay = ((daysSince % nakshatraCycle) + nakshatraCycle) % nakshatraCycle;
    const nakshatraNumber = Math.floor((nakshatraDay / nakshatraCycle) * 27) + 1;

    const nakshatraInfo = NAKSHATRAS.find((n) => n.number === nakshatraNumber) || NAKSHATRAS[0];

    // Nakshatra changes approximately every 24 hours and 18 minutes
    const endTime = new Date(date.getTime() + 24.3 * 60 * 60 * 1000);
    const endTimeStr = endTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      name: nakshatraInfo.name,
      sanskrit: nakshatraInfo.sanskrit,
      number: nakshatraInfo.number,
      lord: nakshatraInfo.lord,
      endTime: endTimeStr,
    };
  }

  /**
   * Calculate Yoga (combination of Sun and Moon positions)
   * Yoga = (Sun longitude + Moon longitude) / 13°20'
   */
  private static calculateYoga(date: Date): Yoga {
    // Simplified calculation
    const yogaCycle = 27; // 27 yogas
    const daysSinceEpoch = date.getTime() / (1000 * 60 * 60 * 24);
    const yogaNumber = Math.floor((daysSinceEpoch % yogaCycle) + 1);

    const yogaInfo = YOGAS.find((y) => y.number === yogaNumber) || YOGAS[0];

    return {
      name: yogaInfo.name,
      sanskrit: yogaInfo.sanskrit,
      number: yogaInfo.number,
    };
  }

  /**
   * Calculate Karana (half-tithi)
   * Karana = tithi / 2, with special rules
   */
  private static calculateKarana(date: Date, tithi: Tithi): Karana {
    // Karana changes twice per tithi
    const karanaNumber = ((tithi.number - 1) % 11) + 1;
    const karanaInfo = KARANAS.find((k) => k.number === karanaNumber) || KARANAS[0];

    return {
      name: karanaInfo.name,
      sanskrit: karanaInfo.sanskrit,
      number: karanaInfo.number,
    };
  }

  /**
   * Calculate Vara (weekday)
   */
  private static calculateVara(date: Date): Vara {
    const dayIndex = date.getDay();
    const varaInfo = VARAS[dayIndex];
    return varaInfo.name as Vara;
  }

  /**
   * Calculate approximate sunrise, sunset, moonrise, moonset
   * Note: These are approximations. For accurate times,
   * use location-based calculations or APIs
   */
  private static calculateSunriseSunset(date: Date) {
    // Simplified sunrise/sunset calculation
    const month = date.getMonth();
    const baseSunrise = "06:00";
    const baseSunset = "18:00";

    // Adjust for season (simplified)
    const seasonalOffset = Math.sin(((month - 3) / 12) * Math.PI * 2) * 60; // minutes
    const sunriseHour = 6 + seasonalOffset / 60;
    const sunsetHour = 18 + seasonalOffset / 60;

    const sunrise = `${Math.floor(sunriseHour).toString().padStart(2, "0")}:${Math.floor(
      (sunriseHour % 1) * 60
    )
      .toString()
      .padStart(2, "0")}`;
    const sunset = `${Math.floor(sunsetHour).toString().padStart(2, "0")}:${Math.floor(
      (sunsetHour % 1) * 60
    )
      .toString()
      .padStart(2, "0")}`;

    // Moon rises approximately 50 minutes later each day
    const moonPhase = this.calculateTithi(date).number;
    const moonriseHour = (18 + (moonPhase * 50) / 60) % 24;
    const moonsetHour = (moonriseHour + 12) % 24;

    const moonrise = `${Math.floor(moonriseHour).toString().padStart(2, "0")}:${Math.floor(
      (moonriseHour % 1) * 60
    )
      .toString()
      .padStart(2, "0")}`;
    const moonset = `${Math.floor(moonsetHour).toString().padStart(2, "0")}:${Math.floor(
      (moonsetHour % 1) * 60
    )
      .toString()
      .padStart(2, "0")}`;

    return {
      sunrise,
      sunset,
      moonrise,
      moonset,
    };
  }

  /**
   * Get Panchanga for today
   */
  static getToday(): Panchanga {
    return this.calculate(new Date());
  }

  /**
   * Get Panchanga for a specific date
   */
  static getDate(date: Date): Panchanga {
    return this.calculate(date);
  }

  /**
   * Get Panchanga for a range of dates
   */
  static getRange(startDate: Date, days: number): Panchanga[] {
    const results: Panchanga[] = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      results.push(this.calculate(date));
    }
    return results;
  }
}
