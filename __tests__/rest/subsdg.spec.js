const {
  withServer,
  loginMvoCoordinator
} = require("../supertest.setup");
const {
  tables
} = require("../../src/data/index");

const testData = {
  subsdgs: [{
      ID: 1,
      BESCHRIJVING: "By 2030, empower and promote the social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, religion or economic or other status",
      NUMMERING: "10.2",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_b4c135a0-1a0e-4ef5-9d10-cee29f3fa3be_goal_10.2_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 5,
    },
    {
      ID: 2,
      BESCHRIJVING: "Implement nationally appropriate social protection systems and measures for all, including floors, and by 2030 achieve substantial coverage of the poor and the vulnerable",
      NUMMERING: "1.2",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_739ab9c0-5912-4775-ba0c-a23d644e126a_goal_1-2_rgb_ng.svg",
      CATEGORIE: 2,
      SDG: 9,
    },
    {
      ID: 3,
      BESCHRIJVING: "Strengthen domestic resource mobilization, including through international support to developing countries, to improve domestic capacity for tax and other revenue collection",
      NUMMERING: "17.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_1abd1919-0b52-4ab1-be09-c554888c98c0_goal_17.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 8,
    },
    {
      ID: 4,
      BESCHRIJVING: "By 2030, achieve universal and equitable access to safe and affordable drinking water for all",
      NUMMERING: "6.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_d50d609e-266d-4297-a89c-8d91302670d5_goal_6.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 11,
    },
    {
      ID: 5,
      BESCHRIJVING: "By 2030, progressively achieve and sustain income growth of the bottom 40 per cent of the population at a rate higher than the national average",
      NUMMERING: "10.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_7efb79aa-9590-4de4-99b7-f7316473477b_goal_10.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 5,
    },
    {
      ID: 6,
      BESCHRIJVING: "By 2030, ensure universal access to affordable, reliable and modern energy services",
      NUMMERING: "7.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_16f414a2-c981-4811-95bf-39c9fc274d3d_goal_7.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 13,
    },
    {
      ID: 7,
      BESCHRIJVING: "Mobilize additional financial resources for developing countries from multiple sources",
      NUMMERING: "17.2",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_e611da1a-63cf-4211-b919-bfe859442a94_goal_17.2_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 8,
    },
    {
      ID: 8,
      BESCHRIJVING: "Adopt measures to ensure the proper functioning of food commodity markets and their derivatives and facilitate timely access to market information, including on food reserves, in order to help limit extreme food price volatility.",
      NUMMERING: "2.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_c464ed5e-ed97-4a47-a95a-4d298144eabb_goal_2.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 6,
    },
    {
      ID: 9,
      BESCHRIJVING: "By 2030, ensure that all girls and boys complete free, equitable and quality primary and secondary education leading to relevant and Goal-4 effective learning outcomes",
      NUMMERING: "4.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_b8f666cb-30be-4dd5-8771-94fac8d9872b_goal_4.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 2,
    },
    {
      ID: 10,
      BESCHRIJVING: "Develop quality, reliable, sustainable and resilient infrastructure, including regional and transborder infrastructure, to support economic development and human well-being, with a focus on affordable and equitable access for all",
      NUMMERING: "9.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_18c33d69-8efa-409d-8ead-fccd44ffd9d6_goal_9.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 3,
    },
    {
      ID: 11,
      BESCHRIJVING: "By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions",
      NUMMERING: "1.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_51f2aa71-64e4-4b19-82dc-a1348ce82741_goal_1-1_rgb_ng.svg",
      CATEGORIE: 2,
      SDG: 9,
    },
    {
      ID: 12,
      BESCHRIJVING: "Take urgent action to end poaching and trafficking of protected species of flora and fauna and address both demand and supply of illegal wildlife products",
      NUMMERING: "15.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_5d08ea5a-c0b5-49a4-993d-40bd2f3d46f9_goal_15.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 4,
    },
    {
      ID: 13,
      BESCHRIJVING: "Minimize and address the impacts of ocean acidification, including through enhanced scientific cooperation at all levels",
      NUMMERING: "14.2",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_9c88e330-dc61-4c15-b0d1-3be5766b89ee_goal_14.2_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 16,
    },
    {
      ID: 14,
      BESCHRIJVING: "Eliminate all forms of violence against all women and girls in the public and private spheres, including trafficking and sexual and other types of exploitation",
      NUMMERING: "5.2",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_e57cd460-b26d-4a18-918c-a500de39dc3f_goal_5.2_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 12,
    },
    {
      ID: 15,
      BESCHRIJVING: "By 2030, ensure access for all to adequate, safe and affordable housing and basic services and upgrade slums",
      NUMMERING: "11.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_941d2b7e-42c3-4c31-8cc2-35df31b0bdc9_goal_11.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 15,
    },
    {
      ID: 16,
      BESCHRIJVING: "Promote inclusive and sustainable industrialization and, by 2030, significantly raise industrys share of employment and gross domestic product, in line with national circumstances, and double its share in least developed countries",
      NUMMERING: "9.2",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_3b173a14-8b6a-408e-8041-85e0806f9f12_goal_9.2_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 3,
    },
    {
      ID: 17,
      BESCHRIJVING: "End all forms of discrimination against all women and girls everywhere",
      NUMMERING: "5.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_e68ea05d-e65b-4d9e-be75-7736a92d2a8d_goal_5.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 12,
    },
    {
      ID: 18,
      BESCHRIJVING: "Significantly reduce all forms of violence and related death rates everywhere",
      NUMMERING: "16.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_e90bc073-aade-4e1a-b5e3-8653ff841eaa_goal_16.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 1,
    },
    {
      ID: 19,
      BESCHRIJVING: "Integrate climate change measures into national policies, strategies and planning",
      NUMMERING: "13.2",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_3064e359-22b2-4c62-a1cd-42af73b35d7b_goal_13.2_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 10,
    },
    {
      ID: 20,
      BESCHRIJVING: "Sustain per capita economic growth in accordance with national circumstances and, in particular, at least 7 per cent gross domestic product growth per annum in the least developed countries",
      NUMMERING: "8.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_f963d103-92f0-4bfa-885d-3e23e5bf1684_goal_8.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 7,
    },
    {
      ID: 21,
      BESCHRIJVING: "Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries",
      NUMMERING: "13.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_8f2d59b3-fbb1-4c33-9bfd-333b15b6cf9d_goal_13.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 10,
    },
    {
      ID: 22,
      BESCHRIJVING: "By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations",
      NUMMERING: "6.2",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_c0859998-99f8-46db-ae7a-e20050e1f2a6_goal_6.2_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 11,
    },
    {
      ID: 23,
      BESCHRIJVING: "By 2030, achieve the sustainable management and efficient use of natural resources",
      NUMMERING: "12.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_b8665aae-6c5c-4d85-bd2b-937c59fb2941_goal_12.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 17,
    },
    {
      ID: 24,
      BESCHRIJVING: "By 2025, prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities, including marine debris and nutrient pollution",
      NUMMERING: "14.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_5a8a02fb-62fa-4fc0-a7e5-3d5fd58b053e_goal_14.1_rgb_ng.svg",
      CATEGORIE: null,
      SDG: 16,
    },
    {
      ID: 25,
      BESCHRIJVING: "By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births",
      NUMMERING: "3.1",
      URLICOON: "https://globalgoalscms.co.uk/wp-content/uploads/2021/09/globalgoals_1806909f-8923-44e9-8fd8-7927779576af_goal_3.1_rgb_ng.svg",
      CATEGORIE: 1,
      SDG: 14,
    },
  ],
};

describe("SubSdg", () => {
  let knex;
  let loginHeader;
  let req;

  withServer(({
    knex: k,
    supertest: s
  }) => {
    knex = k;
    req = s;
  });

  beforeAll(async () => {
    loginHeader = await loginMvoCoordinator(req);
  });

  const url = "/api/subsdg";

  //GET ALL TEST
  describe(`GET ${url}`, () => {
    beforeAll(async () => {
      await knex(tables.subsdgs).insert(testData.subsdgs);
    });

    afterAll(async () => {
      await knex(tables.subsdgs).delete();
    });

    test("it should 200 and return all subsdgs", async () => {
      const response = await req.get(url).set("Authorization", loginHeader);

      expect(response.status).toBe(200);

      //we verwachten 25 subsdgs
      expect(response.body.length).toBeGreaterThanOrEqual(25);
    });
  });

  //GET BY ID TEST
  describe(`GET ${url}/id/:id`, () => {
    // 1 sdg toevoegen
    beforeAll(async () => {
      await knex(tables.subsdgs).insert(testData.subsdgs[0]);
    });

    afterAll(async () => {
      await knex(tables.subsdgs).where("ID", testData.subsdgs[0].ID).delete();
    });

    // we verwachten de toegevoegde subsdg terug te krijgen door op ID te zoeken
    test("it should 200 and return the requested sdg by id", async () => {
      const response = await req.get(`${url}/id/${testData.subsdgs[0].ID}`).set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      //expect(response.body[0]).toEqual(testData.subsdgs[0]);
    });
  });

  //GET BY SDG TEST
  describe(`GET ${url}/sdg/:sdg`, () => {
    beforeAll(async () => {
      await knex(tables.subsdgs).insert(testData.subsdgs);
    });

    afterAll(async () => {
      await knex(tables.subsdgs).delete();
    });

    test("it should 200 and return the requested sdg by name", async () => {
      //We zoeken naar de subsdg met sdg 5
      const sdg = 5;
      const response = await req.get(`${url}/sdg/${sdg}`).set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      //subsdg met naam "Peace, justice and string institutions" is de tweede in testData
      expect(response.body).toEqual(testData.subsdgs[0]);
    });
  });
});