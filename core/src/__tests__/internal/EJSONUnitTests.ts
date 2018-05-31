import * as sinon from "sinon";
import {
  CoreStitchAppClient,
  StitchAppRoutes,
  CoreStitchAuth,
  StitchRequestClient
} from "../../lib/";
import * as EJSON from "mongodb-extjson";

describe("EJSON test", () => {
  it("should stringify Extended JSON correctly", () => {
    expect(
      EJSON.stringify({
        test: 42
      })
    ).toEqual('{"test":{"$numberInt":"42"}}');
  });
  it("should deserialize Extended JSON correctly", () => {
    expect(EJSON.parse('{ "$numberLong": "42" }', { strict: false })).toEqual(
      42
    );
  });
});
