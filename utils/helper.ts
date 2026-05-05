/** Base path of the search-count API used for filter assertions. */
export const STATS_API_PATH = '/api/v1/statistics/offers/count';

type FilterParams = {
    group: string;
    option: string;
};

/**
 * Builds encoded URL params for filter assertions in API requests.
 *
 * Example:
 * filters[0].id=18 → filters%5B0%5D.id=18
 * filters[0].optionIDs[0]=1 → filters%5B0%5D.optionIDs%5B0%5D=1
 */
export function buildEncodedFilterParams(groupId: number, optionId: number): FilterParams {
    const encode = encodeURIComponent;

    return {
        group: `${encode('filters[0].id')}=${groupId}`,
        option: `${encode('filters[0].optionIDs[0]')}=${optionId}`,
    };
}