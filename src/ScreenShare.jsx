import { useCallback, useEffect, useRef, useState } from "react";
import { Space, SpaceEvent } from "@mux/spaces-web";

import Participant from "./Participant";
import "./App.css";

// // 🚨 Don’t forget to add your own JWT!
const JWT = "eyJhbGciOiJSUzI1NiJ9.eyJraWQiOiJZTFNkSWt4RGxrd0JHWEFaMXJWdjY2RlprdDg0ZXROZU1hdDAxQkM0Skk3dyIsImF1ZCI6InJ0Iiwic3ViIjoiQVJlU2ZhejAxY3M4akJXemowMGhwOFR6U2tZb3F6TDAyS1dzd2E1RG1VTURuOCIsInJvbGUiOiJwdWJsaXNoZXIiLCJwYXJ0aWNpcGFudF9pZCI6IiIsImV4cCI6MTY4NTYxODk5N30.Qot_5hgXOTrafB57VgHySKyXCv3DJeOxHfYpblWB1r5zo0YSngV_fIMYD12Y2G8hgKLHnPI05CtLoygxFEBApW_ARHG2slU4PIJVEdcH5EOj6-qINYR6Q8GttdjrITUj8i-tg5pLhcCkrsPWFampZvxSZOFM2hIu2LWPIqSkIWC7StrAzDHBp58oF0GrT4dgKWj3RwEepy7OCnW-o8hHJTGurDGz_JiF55BcexBq67aaqkUobRvuBxIwI-liFwdPJq0eKOMz_ETNySsR99ncL3KICjAmdJu0nSZsge5pylAp1TjFwgs7JoMKxMBMrgqzWKnKAuydOARuqud8fCTU4w";

function ScreenShare() {
  const spaceRef = useRef(null);
  const [localParticipant, setLocalParticipant] = useState(null);
  const [participants, setParticipants] = useState([]);
  const joined = !!localParticipant;

  const addParticipant = useCallback(
    (participant) => {
      setParticipants((currentParticipants) => [
        ...currentParticipants,
        participant,
      ]);
    },
    [setParticipants]
  );

  const removeParticipant = useCallback(
    (participantLeaving) => {
      setParticipants((currentParticipants) =>
        currentParticipants.filter(
          (currentParticipant) =>
            currentParticipant.connectionId !== participantLeaving.connectionId
        )
      );
    },
    [setParticipants]
  );

  useEffect(() => {
    const space = new Space(JWT);

    space.on(SpaceEvent.ParticipantJoined, addParticipant);
    space.on(SpaceEvent.ParticipantLeft, removeParticipant);

    spaceRef.current = space;

    return () => {
      space.off(SpaceEvent.ParticipantJoined, addParticipant);
      space.off(SpaceEvent.ParticipantLeft, removeParticipant);
    };
  }, [addParticipant, removeParticipant]);

  const join = useCallback(async () => {
    // Join the Space
    let localParticipant = await spaceRef.current.join();

    // Get and publish our local tracks
    let localTracks = await localParticipant.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    await localParticipant.publishTracks(localTracks);

    // Set the local participant so it will be rendered
    setLocalParticipant(localParticipant);
  }, []);

  return (
    <div className="App">
      <div className="Navbar">
        <div className="Navbar-left">
          <h2>LIVEQC</h2>
        </div>
      </div>

      <div className="JoinButton">
        <button onClick={join} disabled={joined}>
          Join Space
        </button>
      </div>

      <div className="ParticipantGrid">
        {localParticipant && (
          <Participant
            key={localParticipant.connectionId}
            participant={localParticipant}
          />
        )}

        {participants.map((participant) => {
          return (
            <Participant
              key={participant.connectionId}
              participant={participant}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ScreenShare;

