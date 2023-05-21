export interface DatabaseSaveResponse {
  success: boolean;
  message: string;

  failed?: Array<string>;
  succeeded?: Array<string>;
}
