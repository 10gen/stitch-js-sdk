import {
  CoreStitchService,
  StitchAuthRequestClient,
  StitchServiceRoutes
} from "../..";
import { StitchAuthDocRequest } from "../../internal/net/StitchAuthDocRequest";
import Method from "../../internal/net/Method";

export default class CoreStitchServiceImpl implements CoreStitchService {
  private readonly requestClient: StitchAuthRequestClient;
  private readonly serviceRoutes: StitchServiceRoutes;
  private readonly serviceName: string;

  public constructor(
    requestClient: StitchAuthRequestClient,
    routes: StitchServiceRoutes,
    name: string
  ) {
    this.requestClient = requestClient;
    this.serviceRoutes = routes;
    this.serviceName = name;
  }

  private getCallServiceFunctionRequest(
    name: string,
    args: any[]
  ): StitchAuthDocRequest {
    let body = { name };
    if (this.serviceName !== undefined) {
      body["service"] = this.serviceName;
    }
    body["arguments"] = args;

    const reqBuilder = new StitchAuthDocRequest.Builder();
    reqBuilder
      .withMethod(Method.POST)
      .withPath(this.serviceRoutes.functionCallRoute);
    reqBuilder.withDocument(body);
    return reqBuilder.build();
  }

  public callFunctionInternal<T>(name: string, args: any[]): Promise<T> {
    return this.requestClient.doAuthenticatedJSONRequest(
      this.getCallServiceFunctionRequest(name, args)
    );
  }
}