import { mfChartApi, mfHelperApi } from "@/lib/axios";

export const fetchFund = async (schemeCode) => {
  const { data } = await mfHelperApi.get(`/scheme_code/${schemeCode}`);
  return data.fund;
};

export const fetchIndexFunds = async () => {
  const { data } = await mfHelperApi.get(`?fund_category=index funds&limit=4`);
  return data.funds;
};

export const fetchPopularFunds = async () => {
  const { data } = await mfHelperApi.get(
    `?limit=4&sort_by=return_3y&category=Equity&fund_rating_gte=4`,
  );
  return data.funds;
};

export const fetchCategoryFundList = async (url) => {
  const { data } = await mfHelperApi.get(url);
  return data.funds;
};

export const fetchAllFunds = async () => {
  const { data } = await mfHelperApi.get(
    `?sort_by=return_3y&category=Equity&fund_rating_gte=4`,
  );
  return data.funds;
};

export const fetchAMCs = async () => {
  const { data } = await mfHelperApi.get(`/amcs`);
  return data.amcs;
};

// Fetch categories and subcategories
export const fetchCategories = async () => {
  const { data } = await mfHelperApi.get(`/categories`);
  return data.result;
};

export const fetchFundCategoryRanking = async (schemeCode) => {
  const { data } = await mfHelperApi.get(`/categories/${schemeCode}`);
  return data;
};

export const fetchAmcFunds = async (amcCode) => {
  const { data } = await mfHelperApi.get(`/amcs/${amcCode}`);
  return data.categories;
};

export const fetchMangerFunds = async (managerFunds) => {
  const { data } = await mfHelperApi.get(`/fund-managers/${managerFunds}`);
  return data.funds;
};

export const fetchFundsByFilter = async (filters) => {
  const params = [];

  for (const [key, value] of Object.entries(filters)) {
    if (!value || (Array.isArray(value) && value.length === 0)) continue;

    if (Array.isArray(value)) {
      params.push(`${key}=${value.join(",")}`);
    } else {
      params.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  const queryString = `?${params.join("&")}`;
  const { data } = await mfHelperApi.get(`${queryString}`);

  return data.funds;
};

export const fetchFilteredFunds = async ({ pageParam = 0, filters, LIMIT }) => {
  const params = [];

  for (const [key, value] of Object.entries(filters)) {
    if (!value || (Array.isArray(value) && value.length === 0)) continue;

    if (Array.isArray(value)) {
      params.push(`${key}=${value.join(",")}`);
    } else {
      params.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  params.push(`limit=${LIMIT}`);
  params.push(`offset=${pageParam}`);

  const queryString = `?${params.join("&")}`;
  const { data } = await mfHelperApi.get(`${queryString}`);

  return data;
};

export const fetchChartData = async (scheme_code) => {
  const { data } = await mfChartApi.get(`/${scheme_code}`);

  const fullChartData = data.data?.map((entry) => {
    const [day, month, year] = entry.date.split("-");
    const d = new Date(`${year}-${month}-${day}`);
    const dd = d.toLocaleDateString("en-GB", {
      dateStyle: "medium",
      timeZone: "UTC",
    });

    return { date: dd, nav: Number(entry.nav) };
  });

  return fullChartData.reverse();
};
