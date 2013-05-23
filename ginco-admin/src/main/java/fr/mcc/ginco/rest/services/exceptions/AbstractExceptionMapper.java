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
package fr.mcc.ginco.rest.services.exceptions;

import java.text.MessageFormat;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.ExceptionMapper;

import org.apache.commons.lang3.StringEscapeUtils;
import org.slf4j.Logger;

import fr.mcc.ginco.log.Log;
import fr.mcc.ginco.utils.LabelUtil;

public abstract class AbstractExceptionMapper<E extends Throwable> implements
		ExceptionMapper {
	@Log
	private Logger log;

	protected Response toResponse(Throwable t, String messageKey, String toFormat) {
		String msg = new String();
		if (toFormat != null && !toFormat.isEmpty()){
			msg = MessageFormat.format(LabelUtil.getResourceLabel(messageKey), toFormat);
		}
		else {
			msg = LabelUtil.getResourceLabel(messageKey);
		}
		log.error("Business Exception in REST services : " + t.getMessage());
		log.debug("Business Exception in REST services : " + msg);
		msg = StringEscapeUtils.escapeEcmaScript(msg);
		return Response.status(Status.OK)
				.entity("{success:false, message: '" + msg + "'}").build();
	}
}