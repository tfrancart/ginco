/**
 * Copyright or © or Copr. Ministère Français chargé de la Culture
 * et de la Communication (2013)
 * <p/>
 * contact.gincoculture_at_gouv.fr
 * <p/>
 * This software is a computer program whose purpose is to provide a thesaurus
 * management solution.
 * <p/>
 * This software is governed by the CeCILL license under French law and
 * abiding by the rules of distribution of free software. You can use,
 * modify and/ or redistribute the software under the terms of the CeCILL
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 * <p/>
 * As a counterpart to the access to the source code and rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty and the software's author, the holder of the
 * economic rights, and the successive licensors have only limited liability.
 * <p/>
 * In this respect, the user's attention is drawn to the risks associated
 * with loading, using, modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean that it is complicated to manipulate, and that also
 * therefore means that it is reserved for developers and experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systemsand/or
 * data to be ensured and, more generally, to use and operate it in the
 * same conditions as regards security.
 * <p/>
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */

Ext.define('GincoApp.model.ConceptGroupModel', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'identifier',
            type: 'string'
        },
        {
            name: 'created',
            type: 'string'
        },
        {
            name: 'modified',
            type: 'string'
        },
        {
            name: 'label',
            type: 'string'
        },
        {
            name: 'thesaurusId',
            type: 'string'
        },
        {
            name: 'groupConceptLabelId',
            type: 'integer'
        },
        {
            name: 'type',
            type: 'string'
        },
        {
            name: 'language',
            type: 'string'
        },
        {
            name: 'notation',
            type: 'string'
        },
        {
            name: 'isDynamic',
            type: 'boolean'
        },
        {
            name: 'parentConceptId',
            type: 'string'
        },
        {
            name: 'parentConceptLabel',
            type: 'string'
        },
        {
            name: 'parentGroupId',
            type: 'string'
        },
        {
            name: 'parentGroupLabel',
            type: 'string'
        },
        {
            name : 'concepts',
            type : 'array_of_string'
        }
    ],

    idProperty : 'identifier',

    proxy : {
		api : {
			create : 'services/ui/thesaurusconceptgroupservice/updateConceptGroup',
			update : 'services/ui/thesaurusconceptgroupservice/updateConceptGroup',
			read :   'services/ui/thesaurusconceptgroupservice/getConceptGroup',
			destroy: 'services/ui/thesaurusconceptgroupservice/destroyConceptGroup'
		},
		type : 'ajax',
		reader : {
			type : 'json',
			messageProperty: 'message'
		},
		writer : {
			type : 'json'
		}
	}
});