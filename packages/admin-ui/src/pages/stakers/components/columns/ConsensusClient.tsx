import React, { useEffect, useState } from "react";
import Card from "components/Card";
import { prettyDnpName } from "utils/format";
import { joinCssClass } from "utils/css";
import { Network, StakerItem, StakerItemOk } from "@dappnode/common";
import defaultAvatar from "img/defaultAvatar.png";
import errorAvatar from "img/errorAvatarTrim.png";
import Button from "components/Button";
import { rootPath as installedRootPath } from "pages/installer";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Switch from "components/Switch";

export default function ConsensusClient<T extends Network>({
  consensusClient,
  setNewConsClient,
  newConsClient,
  isSelected,
  ...props
}: {
  consensusClient: StakerItem<T, "consensus">;
  setNewConsClient: React.Dispatch<
    React.SetStateAction<StakerItemOk<T, "consensus"> | undefined>
  >;
  newConsClient: StakerItemOk<T, "consensus"> | undefined;
  isSelected: boolean;
}) {
  const [newUseCheckpointSync, setNewUseCheckpointSync] = useState<boolean>(
    consensusClient.useCheckpointSync || false
  );
  useEffect(() => {
    if (consensusClient.status === "ok")
      setNewConsClient({
        ...consensusClient,
        useCheckpointSync: newUseCheckpointSync
      });
  }, [consensusClient, newUseCheckpointSync, setNewConsClient]);

  return (
    <Card
      {...props}
      className={`consensus-client ${joinCssClass({ isSelected })}`}
      shadow={isSelected}
    >
      <div
        onClick={
          consensusClient.status === "ok"
            ? isSelected
              ? () => setNewConsClient(undefined)
              : () =>
                  setNewConsClient({
                    ...consensusClient
                  })
            : undefined
        }
      >
        {consensusClient.status === "ok" ? (
          <div className="avatar">
            <img
              src={consensusClient.avatarUrl || defaultAvatar}
              alt="avatar"
            />
          </div>
        ) : consensusClient.status === "error" ? (
          <div className="avatar">
            <img src={errorAvatar} alt="avatar" />
          </div>
        ) : null}

        <div className="title">{prettyDnpName(consensusClient.dnpName)}</div>
      </div>

      {consensusClient.status === "ok" && isSelected ? (
        <>
          {consensusClient.isInstalled && !consensusClient.isUpdated && (
            <>
              <Link to={`${installedRootPath}/${consensusClient.dnpName}`}>
                <Button variant="dappnode">UPDATE</Button>
              </Link>
              <br />
              <br />
            </>
          )}
          <>
            {consensusClient.data && (
              <div className="description">
                {consensusClient.data.metadata.shortDescription}
                <hr />
              </div>
            )}
            {consensusClient.useCheckpointSync !== undefined && (
              <Switch
                checked={newUseCheckpointSync}
                onToggle={() => setNewUseCheckpointSync(!newUseCheckpointSync)}
                label={"Use checksync"}
              />
            )}
          </>
        </>
      ) : null}

      {isSelected &&
        consensusClient.dnpName ===
          "gnosis-beacon-chain-prysm.dnp.dappnode.eth" && (
          <Alert variant="warning">
            It is <b>not recommended</b> to use <b>Prysm</b> as a consensus
            client <b>in Gnosis</b>. Use it at your own risk or change to
            another alternative.
          </Alert>
        )}
    </Card>
  );
}
