import {
  apiYouTube,
  fetchYoutubePlaylists,
} from "../services/Youtube/Youtube.service";

describe("Card", () => {
  afterEach(async () => {
    //  RESTORE ALL MOCKS AFTER EACH TEST
    vi.resetAllMocks();
  });

  test("Fetch playlist Axios rejected promise", async () => {
    //  MOCK AXIOS REQUEST USING VITEST
    vi.spyOn(apiYouTube, "get").mockRejectedValue(new Error("Failed to fetch"));

    await expect(fetchYoutubePlaylists()).rejects.toThrow(
      "Request failed with status code 403"
    );
  });
});
