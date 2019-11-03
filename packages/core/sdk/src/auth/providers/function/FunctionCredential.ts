/**
 * Copyright 2018-present MongoDB, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import ProviderCapabilities from "../../ProviderCapabilities";
import StitchCredential from "../../StitchCredential";
import FunctionAuthProvider from "./FunctionAuthProvider";

enum Fields {
  ACCESS_TOKEN = "accessToken"
}

/** 
 * A credential which can be used to log in as a Stitch user
 * using the Facebook authentication provider.
 *
 * Browser SDK users can use the 
 * [FacebookRedirectCredential](https://docs.mongodb.com/stitch-sdks/js/4/classes/facebookredirectcredential.html)
 * with [StitchAuth.loginWithRedirect](https://docs.mongodb.com/stitch-sdks/js/4/interfaces/stitchauth.html#loginwithredirect).
 * Server and React Native SDK users must obtain their own access token.
 * Use a third-party module to get this token and pass it to the FacebookCredential
 * constructor.
 */
export default class FunctionCredential implements StitchCredential {

  public get providerCapabilities(): ProviderCapabilities {
    return new ProviderCapabilities(false);
  }
  public readonly providerName: string;
  public readonly providerType = FunctionAuthProvider.TYPE;

  public readonly material: { [key: string]: string };

  constructor(
    payload: { [key: string]: string },
    providerName: string = FunctionAuthProvider.DEFAULT_NAME
  ) {
    this.providerName = providerName;
    this.material = payload;
  }
}
