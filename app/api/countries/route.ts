import { NextResponse } from "next/server";
import countries from "../../../data/countries.json";

type Country = {
  code: string;
  name: string;
  description: string;
  population: number;
  land_area_km2: number;
  languages: string[];
  gdp_usd: number;
};

export const revalidate = 60;

function pickFields(c: Country, fields?: string[]) {
  if (!fields || fields.length === 0) return c;
  return Object.fromEntries(Object.entries(c).filter(([k]) => fields.includes(k)));
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = (searchParams.get("search") || "").toLowerCase();
  const fieldsParam = searchParams.get("fields");
  const fields = fieldsParam ? fieldsParam.split(",") : undefined;

  const list = (countries as Country[]).filter((c) =>
    !search ||
    c.name.toLowerCase().includes(search) ||
    c.code.toLowerCase() === search ||
    c.description.toLowerCase().includes(search)
  );

  const response = list.map((c) => pickFields(c, fields));
  return NextResponse.json({ total: response.length, data: response });
}
