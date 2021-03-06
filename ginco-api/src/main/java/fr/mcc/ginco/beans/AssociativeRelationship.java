/**
 * Copyright or © or Copr. Ministère Français chargé de la Culture
 * et de la Communication (2013)
 *
 * contact.gincoculture_at_gouv.fr
 *
 * This software is a computer program whose purpose is to provide a thesaurus
 * management solution.
 *
 * This software is governed by the CeCILL license under French law and
 * abiding by the rules of distribution of free software. You can use,
 * modify and/ or redistribute the software under the terms of the CeCILL
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 *
 * As a counterpart to the access to the source code and rights to copy,
 * modify and redistribute granted by the license, users are provided only
 * with a limited warranty and the software's author, the holder of the
 * economic rights, and the successive licensors have only limited liability.
 *
 * In this respect, the user's attention is drawn to the risks associated
 * with loading, using, modifying and/or developing or reproducing the
 * software by the user in light of its specific status of free software,
 * that may mean that it is complicated to manipulate, and that also
 * therefore means that it is reserved for developers and experienced
 * professionals having in-depth computer knowledge. Users are therefore
 * encouraged to load and test the software's suitability as regards their
 * requirements in conditions enabling the security of their systems and/or
 * data to be ensured and, more generally, to use and operate it in the
 * same conditions as regards security.
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL license and that you accept its terms.
 */
package fr.mcc.ginco.beans;

import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;

/**
 * Bean represents relation between two {@link ThesaurusConcept}
 */
@Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
@XmlAccessorType(XmlAccessType.FIELD)
public class AssociativeRelationship implements Serializable {

	@XmlType(namespace = "associativeRelationship")
	public static class Id implements Serializable {
		private String concept1;
		private String concept2;

		public Id() {
		}

		public String getConcept1() {
			return concept1;
		}

		public void setConcept1(String concept1) {
			this.concept1 = concept1;
		}

		public String getConcept2() {
			return concept2;
		}

		public void setConcept2(String concept2) {
			this.concept2 = concept2;
		}


		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			if (concept1 == null) {
				result = prime * result
						+ 0;
			} else {
				result = prime * result
						+ concept1.hashCode();
			}
			if (concept2 == null) {
				result = prime * result
						+ 0;
			} else {
				result = prime * result
						+ concept2.hashCode();
			}
			return result;
		}


		@Override
		public boolean equals(Object obj) {
			Id other = (Id) obj;
			if ((concept1.equals(other.concept1) && concept2.equals(other.concept2))
					|| concept1.equals(other.concept2) && concept2.equals(other.concept1)) {
				return true;
			}
			return false;
		}

	}

	private Id identifier;
	private AssociativeRelationshipRole relationshipRole;
	@XmlTransient
	private ThesaurusConcept conceptLeft;
	@XmlTransient
	private ThesaurusConcept conceptRight;

	public Id getIdentifier() {
		return identifier;
	}

	public void setIdentifier(Id identifier) {
		this.identifier = identifier;
	}

	public AssociativeRelationshipRole getRelationshipRole() {
		return relationshipRole;
	}

	public void setRelationshipRole(AssociativeRelationshipRole relationshipRole) {
		this.relationshipRole = relationshipRole;
	}

	public ThesaurusConcept getConceptLeft() {
		return conceptLeft;
	}

	public void setConceptLeft(ThesaurusConcept conceptLeft) {
		this.conceptLeft = conceptLeft;
	}

	public ThesaurusConcept getConceptRight() {
		return conceptRight;
	}

	public void setConceptRight(ThesaurusConcept conceptRight) {
		this.conceptRight = conceptRight;
	}

}