import "mocha";
import { expect } from "chai";
import { dappmanagerTestApiUrl, printData } from "../endToEndUtils";
import { validateRoutesReturn } from "../../../src/common";
import fetch from "node-fetch";
import { URL } from "url";

const apiCallMethod = "autoUpdateDataGet";
const url = new URL(`${dappmanagerTestApiUrl}/${apiCallMethod}`);

describe(`API call ${apiCallMethod}`, async () => {
  it("Should return the auto-updates data", async () => {
    const response = await fetch(url);
    expect(response.status).to.equal(200);
    const body = await response.json();
    printData(body);
    expect(validateRoutesReturn(apiCallMethod, body)).to.not.throw;
  });
});
