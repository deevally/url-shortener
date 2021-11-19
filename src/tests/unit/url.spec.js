import supertest from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { ShortUrl } from "../../models/url-shortener.model";
import { MONGO_DB_URL_TEST } from "../../config/config";
import UrlService from "../../services/url-shortener.service";
import { BASE_URL_TEST } from "../../config/config";

const request = supertest(app);

//Connect to MongoDB
beforeEach((done) => {
  mongoose.connect(
    MONGO_DB_URL_TEST,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => done()
  );
});

//Disconnect from MongoDB
afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe("URL SHORTENER CONTROLLER", () => {
  test("should return the base api", async () => {
    const response = await request.get("");
    expect(response.body.Message).toEqual("Welcome to QU-Url Shortener");
    expect(response.statusCode).toBe(200);
  });

  test("Shorten Url", async () => {
    const options = {
      originalUrl:
        "https://www.amazon.com/Samsung-Unlocked-Fingerprint-Recognition-Long-Lasting/dp/B082XYGR2C/ref=sr_1_12?keywords=Apple+iPhone+11+Pro&qid=1637315434&sr=8-12",
    };

    //check the response
    const response = await request.post("/shorten-url").send(options);
    expect(response.body.data._id).toBeTruthy();
    expect(response.statusCode).toBe(201);

    //check the database
    const findurl = await ShortUrl.findOne({ _id: response.body.data._id });
    expect(findurl.originalUrl).toBe(options.originalUrl);
    expect(findurl).toBeTruthy();
  });

  test("delete url", async () => {
    const urlCode = nanoid(10);

    const shortUrl = `${BASE_URL_TEST}/${urlCode}`;

    const options = {
      originalUrl:
        "https://www.amazon.com/Samsung-Unlocked-Fingerprint-Recognition-Long-Lasting/dp/B082XYGR2C/ref=sr_1_12?keywords=Apple+iPhone+11+Pro&qid=1637315434&sr=8-12",
      shortenedUrl: shortUrl,
      urlId: urlCode,
    };

    const url = await ShortUrl.create(options);
    await request.delete(`/api/v1/url/${url.id}`);
    const findurl = await ShortUrl.findOne({ urlId: url.id });
    expect(findurl).toBeFalsy();
  });

  test("get long url", async () => {
    const urlCode = nanoid(10);

    const shortUrl = `${BASE_URL_TEST}/${urlCode}`;

    const options = {
      originalUrl:
        "https://www.amazon.com/Samsung-Unlocked-Fingerprint-Recognition-Long-Lasting/dp/B082XYGR2C/ref=sr_1_12?keywords=Apple+iPhone+11+Pro&qid=1637315434&sr=8-12",
      shortenedUrl: shortUrl,
      urlId: urlCode,
    };

    const url = await ShortUrl.create(options);
    const longUrl = await request.get(`/api/v1/orginalurl/${url.urlId}`);
    expect(longUrl).toBeTruthy();
    expect(302);
  });
});

describe("URL SHORTENER SERVICE", () => {
test("Shorten Url service", async () => {

   
        const originalUrl= 
          "https://www.amazon.com/Samsung-Unlocked-Fingerprint-Recognition-Long-Lasting/dp/B082XYGR2C/ref=sr_1_12?keywords=Apple+iPhone+11+Pro&qid=1637315434&sr=8-12";
    
     const urlService = await UrlService.ShortenUrl(originalUrl);
    expect(urlService).toBeTruthy();
    expect(urlService).toHaveProperty("shortenedUrl");
    expect(urlService).toHaveProperty("urlId");
    expect(urlService).toHaveProperty("originalUrl");
});

test("get url by urlId", async()=>{
    const urlCode = nanoid(10);

    const shortUrl = `${BASE_URL_TEST}/${urlCode}`;
    const options = {
        originalUrl:
          "https://www.amazon.com/Samsung-Unlocked-Fingerprint-Recognition-Long-Lasting/dp/B082XYGR2C/ref=sr_1_12?keywords=Apple+iPhone+11+Pro&qid=1637315434&sr=8-12",
        shortenedUrl: shortUrl,
        urlId: urlCode,
      };
  
      const url = await ShortUrl.create(options);
        const response = await UrlService.GetUrl(url.urlId);
        expect(response).toBe(url.originalUrl);
    })

    
test("delete url by urlId", async()=>{
    const urlCode = nanoid(10);

    const shortUrl = `${BASE_URL_TEST}/${urlCode}`;
    const options = {
        originalUrl:
          "https://www.amazon.com/Samsung-Unlocked-Fingerprint-Recognition-Long-Lasting/dp/B082XYGR2C/ref=sr_1_12?keywords=Apple+iPhone+11+Pro&qid=1637315434&sr=8-12",
        shortenedUrl: shortUrl,
        urlId: urlCode,
      };
  
      const url = await ShortUrl.create(options);
        const response = await UrlService.DeleteUrl(url.urlId);
        expect(response).toBeTruthy();

    })
});