import { Injectable } from '@angular/core';
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { compactAgencies, defaultAgencies } from './data';
import { cloneDeep } from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class AgenciesMockApi {
    private readonly _compactAgencies: any[];
    private readonly _defaultAgencies: any[];

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService) {
        // Set the data
        this._compactAgencies = compactAgencies;
        this._defaultAgencies = defaultAgencies;

        // Register Mock API handlers
        this.registerHandlers();
    }

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // Navigation - GET
        this._fuseMockApiService.onGet('api/agencies').reply(() => {
            // Clone the data to preserve the originals
            const compactAgencies = cloneDeep(this._compactAgencies);
            const defaultAgencies = cloneDeep(this._defaultAgencies);

            // Do some stuff with your data

            // Return
            return [
                200,
                {
                    compact: compactAgencies,
                    default: defaultAgencies,
                },
            ];
        });

        // Navigation - PUT
        this._fuseMockApiService.onPut('api/agencies').reply(({ request }) => {
            // Save the new navigation item
            const newAgenciesItem = cloneDeep(request.body.agenciesItem);
            newAgenciesItem.id = FuseMockApiUtils.guid();
            this._defaultAgencies.unshift(newAgenciesItem);

            // Return
            return [200, newAgenciesItem];
        });
    }
}
