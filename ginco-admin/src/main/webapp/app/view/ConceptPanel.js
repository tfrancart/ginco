/**
 * Copyright or © or Copr. Ministère Français chargé de la Culture et de la
 * Communication (2013) <p/> contact.gincoculture_at_gouv.fr <p/> This software
 * is a computer program whose purpose is to provide a thesaurus management
 * solution. <p/> This software is governed by the CeCILL license under French
 * law and abiding by the rules of distribution of free software. You can use,
 * modify and/ or redistribute the software under the terms of the CeCILL
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info". <p/> As a counterpart to the access to the source
 * code and rights to copy, modify and redistribute granted by the license,
 * users are provided only with a limited warranty and the software's author,
 * the holder of the economic rights, and the successive licensors have only
 * limited liability. <p/> In this respect, the user's attention is drawn to the
 * risks associated with loading, using, modifying and/or developing or
 * reproducing the software by the user in light of its specific status of free
 * software, that may mean that it is complicated to manipulate, and that also
 * therefore means that it is reserved for developers and experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systemsand/or data
 * to be ensured and, more generally, to use and operate it in the same
 * conditions as regards security. <p/> The fact that you are presently reading
 * this means that you have had knowledge of the CeCILL license and that you
 * accept its terms.
 */

/*
 * File: app/view/ConceptPanel.js Concept Creation/Edition Form + Notes
 * 
 */

Ext.Loader.setPath('Ext.ux', 'extjs/ux');
Ext.require([ 'Ext.ux.CheckColumn', 'GincoApp.view.NoteConceptPanel' ]);

Ext
		.define(
				'GincoApp.view.ConceptPanel',
				{
					extend : 'GincoApp.view.ThesaurusEntityPanel',
					initPreferedTermBeforeLoad : '',

					alias : 'widget.conceptPanel',
					localized : true,
					closable : true,
					layout : {
						type : 'vbox',
						align : 'stretch'
					},

					// Labels
					xIdentifierLabel : 'Identifier',
					xCreatedDateLabel : 'Creation date',
					xModificationDateLabel : 'Modification date',
					xTopTermConceptLabel : 'Is a TopTerm Concept',
					xLexicalValueLabel : 'Lexical value',
					xLanguagesLabel : 'Languages',
					xRoleColumnLabel : 'Role',
					xPreferedColumnLabel : 'Prefered',
					xConceptPanelTitle : 'New Concept',
					xTermListGridTitle : 'Terms list',
					xSave : 'Save',
					xDelete : 'Delete',
					xAddTerm : 'Add a term',
					xPreferedTerm : 'Prefered Term',
					xNonPreferedTerm : 'Non Prefered Term',
					xCreateTerm : 'Create Term',
					xExistingTerm : 'Select Existing Term',
					xDetach : 'Detach from Concept',
					xAddParent : 'Add parent Concept',
					xNotesTab : 'Notes of this concept',
					xActions : 'Actions',
					xAddRelationship : 'Add associative relationship',
					xAssociatedConceptsListGridTitle : 'Associated terms',
					xRootConcepts : 'Root Concepts',
					xParentConcepts : 'Parent Concepts',
					xRemoveParent : 'Remove connection to parent concept',
					xRemoveChild : 'Remove connection to child concept',
					xAssociationRemove : 'Remove association',
					xChildrenConcepts : 'Children Concepts',
					xConceptStatusLabel : 'Concept status',
					xHiddenTermColumnLabel : 'Hidden term',
					xConceptHierarchicalRoleLabels : ['BT-NT','BTG-NTG','BTI-NTI','BTP-NTP'],
					xNotationLabel : 'Notation',
					xExportBranch : 'Export this branch',
					
					conceptHierarchicalRoleRenderer : function(value,record)
					{
						return this.ownerCt.ownerCt.ownerCt.ownerCt.xConceptHierarchicalRoleLabels[value];
					},

					initComponent : function() {
						var cellEditing = Ext.create(
								'Ext.grid.plugin.CellEditing', {
									clicksToEdit : 1
								});
						var cellHierarchicalRoleEditing = Ext.create(
								'Ext.grid.plugin.CellEditing', {
									clicksToEdit : 1
								});
                        var cellAssociativeRoleEditing = Ext.create(
                            'Ext.grid.plugin.CellEditing', {
                                clicksToEdit : 1
                            });
						
						var me = this;
						me.conceptTermStore = Ext
								.create('GincoApp.store.ThesaurusTermStore');
						
						me.hierarchicalRelationRoleStore = Ext
						.create('GincoApp.store.HierarchicalRelationRoleStore');

						me.rootConceptStore = Ext
								.create('GincoApp.store.SimpleConceptStore');
						me.parentConceptStore = Ext
								.create('GincoApp.store.HierarchicalAssociationStore');
						me.childrenConceptStore = Ext
								.create('GincoApp.store.HierarchicalAssociationStore');

                        me.associatedConceptStore = Ext
                                .create('GincoApp.store.AssociationStore');
                        me.associationRoleStore = Ext
                                .create('GincoApp.store.AssociationRoleStore');

						me.termRoleStore = Ext
								.create('GincoApp.store.TermRoleStore');
						me.customAttrTypeStore = Ext.create('GincoApp.store.CustomConceptAttributeTypeStore');
						me.customAttrStore = Ext.create('GincoApp.store.CustomConceptAttributeStore');

						Ext
								.applyIf(
										me,
										{
											title : me.xConceptPanelTitle,
											items : [ {
												xtype : 'tabpanel',
												flex : 1,
												items : [
														{
															xtype : 'panel',
															title : me.xConceptPanelTitle,
															layout : {
																type : 'vbox',
																align : 'stretch'
															},
															items : [ {
																xtype : 'form',
																requiredRoles : ['ADMIN'],
																itemId : 'conceptForm',
																flex : 1,
																autoScroll : true,
																pollForChanges : true,
																trackResetOnLoad : true,
																defaults : {
																},
																bbar : Ext.create('GincoApp.view.BottomFormToolbar'),
																dockedItems : [ {
																	xtype : 'toolbar',
																	dock : 'top',
																	items : [
																			{
																				xtype : 'button',
																				text : me.xSave,
																				requiredRoles : ['ADMIN'],
																				disabled : true,
																				cls : 'save',
																				iconCls : 'icon-save',
																				itemId : 'saveConcept'
																			},
																			{
																				xtype : 'button',
																				text : me.xDelete,
																				requiredRoles : ['ADMIN'],
																				disabled : true,
																				itemId : 'deleteConcept',
																				cls : 'delete',
																				iconCls : 'icon-delete'
																			},
																			{
																				xtype : 'button',
																				text : me.xExportBranch,
																				requiredRoles : ['ADMIN'],
																				itemId : 'exportBranch',
																				iconCls : 'exports-icon'
																			} ]
																} ],
																items : [
																		{
																			xtype : 'displayfield',
																			name : 'identifier',
																			fieldLabel : me.xIdentifierLabel
																		},
																		{
																			xtype : 'displayfield',
																			name : 'created',
																			fieldLabel : me.xCreatedDateLabel
																		},
																		{
																			xtype : 'displayfield',
																			name : 'modified',
																			fieldLabel : me.xModificationDateLabel
																		},
																		{
																			xtype : 'checkbox',
																			name : 'topconcept',
																			fieldLabel : me.xTopTermConceptLabel
																		},
																		{
																			xtype : 'combobox',
																			name : 'status',
																			itemId : 'conceptStatusCombo',
																			fieldLabel : me.xConceptStatusLabel,
																			editable : false,
																			multiSelect : false,
																			displayField : 'statusLabel',
																			valueField : 'status',
																			forceSelection : true,
																			store : Ext
																					.create('GincoApp.store.ConceptStatusStore'),
																			anchor : '70%',
																			margin : '5 0 5 0'
																		},
																		{
																			xtype : 'textfield',
																			name : 'notation',
																			fieldLabel : me.xNotationLabel,
																			anchor : '70%'
																		},
																		{
																			trackResetOnLoad :true,
																			border : false,
																			xtype : 'customattrform',
																			metadataStore : me.customAttrTypeStore,
																			dataStore : me.customAttrStore,
																			itemId : 'customAttributeForm',
																		} ,
																		{
																			xtype : 'gridpanel',
																			itemId : 'gridPanelTerms',
																			title : me.xTermListGridTitle,
																			store : me.conceptTermStore,
																			plugins : [ cellEditing ],
																			dockedItems : [ {
																				xtype : 'toolbar',
																				dock : 'top',
																				items : [ {
																					xtype : 'button',
																					text : me.xAddTerm,
																					menu : {
																						xtype : 'menu',
																						items : [
																								{
																									xtype : 'menuitem',
																									text : me.xPreferedTerm,
																									menu : {
																										xtype : 'menu',
																										items : [
																												{
																													xtype : 'menuitem',
																													itemId : 'newTermFromConceptPrefBtn',
																													text : me.xCreateTerm
																												},
																												{
																													xtype : 'menuitem',
																													itemId : 'selectTermFromConceptPrefBtn',
																													text : me.xExistingTerm
																												} ]
																									}
																								},
																								{
																									xtype : 'menuitem',
																									text : me.xNonPreferedTerm,
																									menu : {
																										xtype : 'menu',
																										items : [
																												{
																													xtype : 'menuitem',
																													itemId : 'newTermFromConceptNonPrefBtn',
																													text : me.xCreateTerm
																												},
																												{
																													xtype : 'menuitem',
																													itemId : 'selectTermFromConceptNonPrefBtn',
																													text : me.xExistingTerm
																												} ]
																									}
																								} ]
																					}
																				} ]
																			} ],

																			columns : [
																					{
																						dataIndex : 'identifier',
																						text : me.xIdentifierLabel
																					},
																					{
																						dataIndex : 'lexicalValue',
																						text : me.xLexicalValueLabel,
																						flex : 1
																					},
																					{
																						dataIndex : 'language',
																						text : me.xLanguagesLabel
																					},
																					{
																						xtype : 'checkcolumn',
																						dataIndex : 'prefered',
																						header : me.xPreferedColumnLabel,
																						stopSelection : false
																					},
																					{
																						xtype : 'checkcolumn',
																						dataIndex : 'hidden',
																						header : me.xHiddenTermColumnLabel,
																						stopSelection : false
																					},
																					{
																						dataIndex : 'role',
																						header : me.xRoleColumnLabel,
																						stopSelection : false,
																						editor : new Ext.form.field.ComboBox(
																								{
																									typeAhead : true,
																									triggerAction : 'all',
																									selectOnTab : true,
																									store : me.termRoleStore,
																									lazyRender : true,
																									listClass : 'x-combo-list-small',
																									displayField : 'label',
																									valueField : 'code'
																								})
																					},
																					{
																						dataIndex : 'created',
																						text : me.xCreatedDateLabel
																					},

																					{
																						xtype : 'actioncolumn',
																						itemId : 'conceptActionColumn',
																						header : me.xActions,
																						items : [ {
																							icon : 'images/detach.png',
																							tooltip : me.xDetach,
																							handler : function(
																									view,
																									rowIndex,
																									colIndex,
																									item,
																									e,
																									record,
																									row) {

																							}
																						} ]
																					} ]
																		},
																		{
																			xtype : 'gridpanel',
																			itemId : 'gridPanelParentConcepts',
																			title : me.xParentConcepts,
																			store : me.parentConceptStore,
																			plugins : [ cellHierarchicalRoleEditing ],

																			dockedItems : [ {
																				xtype : 'toolbar',
																				dock : 'top',
																				items : [ {
																					xtype : 'button',
																					text : me.xAddParent,
																					disabled : true,
																					itemId : 'addParent',
																					cls : 'addParent',
																					iconCls : 'icon-add-parent'
																				} ]
																			} ],

																			columns : [
																					{
																						dataIndex : 'identifier',
																						text : me.xIdentifierLabel
																					},
																					{
																						dataIndex : 'label',
																						text : me.xLexicalValueLabel,
																						flex : 1
																					},
																					{
																						dataIndex : 'role',
																						header : me.xRoleColumnLabel,
																						stopSelection : false,
																						renderer : me.conceptHierarchicalRoleRenderer,
																						editor : new Ext.form.field.ComboBox(
																								{
																									typeAhead : true,
																									triggerAction : 'all',
																									selectOnTab : true,
																									store : me.hierarchicalRelationRoleStore,
																									lazyRender : true,
																									listClass : 'x-combo-list-small',
																									displayField : 'roleLabel',
																									valueField : 'role'
																								})
																					},
																					{
																						xtype : 'actioncolumn',
																						itemId : 'parentConceptActionColumn',
																						header : me.xActions,
																						items : [ {
																							icon : 'images/detach.png',
																							tooltip : me.xRemoveParent,
																							handler : function(
																									view,
																									rowIndex,
																									colIndex,
																									item,
																									e,
																									record,
																									row) {

																							}
																						} ]
																					} ]
																		},
																		{
																			xtype : 'gridpanel',
																			title : me.xChildrenConcepts,
																			store : me.childrenConceptStore,
																			itemId : 'gridPanelChildrenConcepts',

																			columns : [
																					{
																						dataIndex : 'identifier',
																						text : me.xIdentifierLabel
																					},
																					{
																						dataIndex : 'label',
																						text : me.xLexicalValueLabel,
																						flex : 1
																					},
																					{
																						dataIndex : 'role',
																						header : me.xRoleColumnLabel,
																						stopSelection : false,
																						renderer : me.conceptHierarchicalRoleRenderer
																					},
																					{
																						xtype : 'actioncolumn',
																						itemId : 'childConceptActionColumn',
																						header : me.xActions,
																						items : [ {
																							icon : 'images/detach.png',
																							tooltip : me.xRemoveChild,
																							handler : function(
																									view,
																									rowIndex,
																									colIndex,
																									item,
																									e,
																									record,
																									row) {}
																						} ]
																					} ]
																		},
																		{
																			xtype : 'gridpanel',
																			title : me.xRootConcepts,
																			store : me.rootConceptStore,
																			itemId : 'gridPanelRootConcepts',

																			columns : [
																					{
																						dataIndex : 'identifier',
																						text : me.xIdentifierLabel
																					},
																					{
																						dataIndex : 'label',
																						text : me.xLexicalValueLabel,
																						flex : 1
																					} ]
																		},
																		{
																			xtype : 'gridpanel',
																			title : me.xAssociatedConceptsListGridTitle,
																			store : me.associatedConceptStore,
																			itemId : 'gridPanelAssociatedConcepts',
                                                                            plugins : [ cellAssociativeRoleEditing ],

																			dockedItems : [ {
																				xtype : 'toolbar',
																				dock : 'top',
																				items : [ {
																					xtype : 'button',
																					text : me.xAddRelationship,
																					disabled : true,
																					itemId : 'addAssociativeRelationship',
																					cls : 'addAssociativeRelationship',
																					iconCls : 'icon-add-associative-relationship'
																				} ]
																			} ],

																			columns : [
																					{
																						dataIndex : 'identifier',
																						text : me.xIdentifierLabel
																					},
																					{
																						dataIndex : 'label',
																						text : me.xLexicalValueLabel,
																						flex : 1
																					},
                                                                                    {
                                                                                        dataIndex : 'roleCode',
                                                                                        header : me.xRoleColumnLabel,
                                                                                        stopSelection : false,
                                                                                        editor : new Ext.form.field.ComboBox(
                                                                                            {
                                                                                                typeAhead : true,
                                                                                                triggerAction : 'all',
                                                                                                selectOnTab : true,
                                                                                                store : me.associationRoleStore,
                                                                                                lazyRender : true,
                                                                                                listClass : 'x-combo-list-small',
                                                                                                displayField : 'label',
                                                                                                valueField : 'code'
                                                                                            })
                                                                                    },
																					{
																						xtype : 'actioncolumn',
																						itemId : 'associatedConceptActionColumn',
																						header : me.xActions,
																						items : [ {
																							icon : 'images/detach.png',
																							tooltip : me.xAssociationRemove,
																							handler : function(
																									view,
																									rowIndex,
																									colIndex,
																									item,
																									e,
																									record,
																									row) {

																							}
																						} ]
																					} ]
																		} ]
															} ]
														},
														{
															title : me.xNotesTab,
															xtype : 'noteConceptPanel',
															closable : false,
															disabled : true
														} ]
											} ]
										});

						me.callParent(arguments);
					}
				});