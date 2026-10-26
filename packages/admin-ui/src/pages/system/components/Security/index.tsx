import React from "react";
import SubTitle from "components/SubTitle";
import SecurityIssues from "./securityIssues";
import { ReleaseTrustedKeysEditor } from "./ReleaseTrustedKeysEditor";

export default function SystemSecurity() {
  return (
    <>
      <SecurityIssues />
      <SubTitle>Release trusted keys</SubTitle>
      <ReleaseTrustedKeysEditor />
    </>
  );
}
