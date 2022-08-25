interface ListFilters {
  isDeleted?: boolean;
  includeDeleted?: boolean;
}

export interface GetAllProjectsFilters extends ListFilters {}

export interface GetAllUsersFilters extends ListFilters {}

export interface GetAllIssuesFilters extends ListFilters {}

export interface GetAllNotesFilters extends ListFilters {}
