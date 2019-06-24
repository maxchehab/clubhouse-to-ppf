export class NoApiKeyProvidedException implements Error {
  readonly name: string = 'NoApiKeyProvidedException';

  readonly message: string =
    `No API key provided. Define it in the CLUBHOUSE_API_KEY enviornment variable. ` +
    `You can generate your key here: https://app.clubhouse.io/workos/settings/account/api-tokens`;
}
