import axios from "axios";

export enum League {
  League = "League",
  LeagueHC = "LeagueHC",
  Hardcore = "Hardcore",
  Standard = "Standard",
  Ruthless = "Ruthless",
  RuthlessHC = "RuthlessHC",
  None = "none",
}

export interface ILeagueNameTranslation {
  fileName: string;
  leagueName: string;
}

export function translateLeagueName(name: string): League {
  const low = name.toLowerCase();

  switch (true) {
    case low.includes("standard"):
      return League.Standard;

    case low === "hardcore":
      return League.Hardcore;

    case low.includes("ruthless") && low.includes("hardcore"):
      return League.RuthlessHC;

    case low.includes("ruthless"):
      return League.Ruthless;

    case low.includes("hardcore"):
      return League.LeagueHC;

    default:
      return League.League;
  }
}

export async function getRealLeagueName(league: string): Promise<string> {
  if (league === "Standard") return "Standard";
  if (league === "Hardcore") return "Hardcore";

  const leagueNames: ILeagueNameTranslation[] = await fetchLeaguesFromGithub();

  // if a league is active its name will always be at third position, if not it
  // will default to "Standard" here just in case
  const Currleague = leagueNames[2] ? leagueNames[2].leagueName : "Standard";

  if (league === "League") return Currleague;
  if (league === "LeagueHC") return "Hardcore " + Currleague;

  return "none";
}

async function fetchLeaguesFromGithub() {
  const ghUrl =
    "https://raw.githubusercontent.com/The-Forbidden-Trove/poeninja-prices/main/Leagues.txt";

  const availableLeagues = await axios.get(ghUrl);
  return availableLeagues.data.filter((leagueObj: any) => {
    const league = leagueObj.leagueName;
    return !league.includes("SSF") && !league.includes("Royale");
  });
}


export function findRealLeagueName(
  name: string,
  leagueNameTranslations: ILeagueNameTranslation[],
): string {
  // debugger;
  let translatedLeague = "None";
  leagueNameTranslations.forEach(
    (leagueNameTranslation: ILeagueNameTranslation) => {
      if (leagueNameTranslation.fileName == name)
        translatedLeague = leagueNameTranslation.leagueName;
    },
  );
  return translatedLeague;
}
