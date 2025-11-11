import { NextResponse } from "next/server";
import countries from "../../../../data/countries.json";

type Country = {
  code: string;
  name: string;
  description: string;
  population: number;
  land_area_km2: number;
  languages: string[];
  gdp_usd: number;
};

export async function GET(_req: Request, { params }: { params: { code: string } }) {
  const code = params.code.toUpperCase();
  const c = (countries as Country[]).find((x) => x.code.toUpperCase() === code);

  if (!c) return new NextResponse("Not Found", { status: 404 });
  return NextResponse.json(c);
}
