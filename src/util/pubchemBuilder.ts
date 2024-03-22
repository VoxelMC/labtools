// LINK FORMAT https://pubchem.ncbi.nlm.nih.gov/rest/pug/<input specification>/<operation specification>/[<output specification>][?<operation_options>]
// https://pubchemdocs.ncbi.nlm.nih.gov/pug-rest$_Toc494865554

export class PubChemUrlBuilder {
    domain: string = '';
    namespace: string = '';
    readonly baseUrl: string = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/';
    searchData: string[] = [];
    propertyQueries: string[] = [];
    wantsProperties: boolean = false;
    structureSearch: string = '';
    dataType: string = '';

    constructor() {}

    isValid() {
        return !(this.domain + this.namespace === '');
    }
    toString() {
        const searchData = this.searchData.join(',');
        const propertyQueries =
            this.wantsProperties ?
                'property/' + this.propertyQueries.join(',')
            :   '';
        const namespace = (this.structureSearch + ' ' + this.namespace)
            .trim()
            .replace(' ', '/');

        const out =
            this.baseUrl +
            [this.domain, namespace, searchData, propertyQueries, this.dataType]
                .join('/')
                .replaceAll('//', '/');
        console.log(out);
        return out;
    }

    private trySetDomain(type: string) {
        if (this.domain !== '') {
            console.error(
                'You cannot set two different domain types. Current type: ' +
                    this.dataType
            );
            return this;
        }
        this.domain = type;
        return this;
    }
    forSubstance() {
        return this.trySetDomain('substance');
    }
    forCompound() {
        return this.trySetDomain('compound');
    }
    forAssay() {
        return this.trySetDomain('assay');
    }

    private trySetNamespace(type: string) {
        if (this.namespace !== '') {
            console.error(
                'You cannot set two different namespace types. Current type: ' +
                    this.dataType
            );
            return this;
        }
        this.namespace = type;
        return this;
    }
    private find(...identifiers: string[]) {
        this.searchData.push(...identifiers);
        return this;
    }
    findByCIDs(...cids: string[]) {
        this.trySetNamespace('cid');
        return this.find(...cids);
    }
    findByName(name: string) {
        this.trySetNamespace('name');
        return this.find(name);
    }
    findBySMILES(smiles: string) {
        this.trySetNamespace('smiles');
        return this.find(smiles);
    }
    findByINCHI(inchi: string) {
        this.trySetNamespace('inchi');
        return this.find(inchi);
    }
    findBySDF(sdf: string) {
        this.trySetNamespace('sdf');
        return this.find(sdf);
    }
    findByINCHIKey(inchiKey: string) {
        this.trySetNamespace('inchikey');
        return this.find(inchiKey);
    }
    findByFormula(formula: string) {
        this.trySetNamespace('formula');
        return this.find(formula);
    }

    searchSubstructures() {
        this.structureSearch = 'substructure';
        return this;
    }
    searchSuperstructures() {
        this.structureSearch = 'superstructure';
        return this;
    }
    searchBySimilarity() {
        this.structureSearch = 'similarity';
        return this;
    }
    searchByIdentity() {
        this.structureSearch = 'identity';
        return this;
    }

    /** Output as a PNG */
    asPNG() {
        return this.trySetDataType('PNG');
    }
    /** Output as a `JSON` string. */
    asJSON() {
        return this.trySetDataType('JSON');
    }
    /** Output as a `.xml` string. */
    asXML() {
        return this.trySetDataType('XML');
    }
    /** Output as a `.csv` string. */
    asCSV() {
        return this.trySetDataType('CSV');
    }
    /** Output as a `.txt` string. */
    asText() {
        return this.trySetDataType('TXT');
    }
    /** Output as an NCBI ASNT formatted string. */
    asNCBI() {
        return this.trySetDataType('ASNT');
    }
    private trySetDataType(type: string) {
        if (this.dataType !== '') {
            console.error(
                'You cannot set two different output types. Current type: ' +
                    this.dataType
            );
            return this;
        }
        this.dataType = type;
        return this;
    }

    withProperties(...properties: Property[]) {
        this.wantsProperties = true;
        this.propertyQueries.push(...properties);
        return this;
    }
}
type Property = 'IsomericSMILES' | 'CanonicalSMILES';
