import { Flagship, FSSdkStatus, DecisionMode, LogLevel } from "@flagship.io/react-sdk";

// Function to start the Flagship SDK Decision API mode
export function startFlagshipSDK() {
  if (
    Flagship.getStatus() &&
    Flagship.getStatus() !== FSSdkStatus.SDK_NOT_INITIALIZED
  ) {
    return Flagship; // If it has been initialized, return early
  }
  return Flagship.start(
    "YOUR_ENV_ID", // set your environment ID
    "YOUR_API_KEY", // set your API key
    {
      fetchNow: false, // Do not fetch flags immediately
      decisionMode: DecisionMode.DECISION_API, // set decision mode : DECISION_API
      logLevel: LogLevel.INFO, // set log level
    }
  );
}

export async function getFsVisitorData(visitorData: {
  id: string;
  hasConsented: boolean;
  context: any;
}) {
  // start the SDK in Decision Api mode et get the Flagship instance
  const flagship = startFlagshipSDK();

  // Create a visitor
  const visitor = flagship.newVisitor({
    visitorId: visitorData.id,
    hasConsented: visitorData.hasConsented,
    context: visitorData.context,
  });

  // Fetch flag values for the visitor
  await visitor.fetchFlags();

  // Return visitor instance
  return visitor;
}
