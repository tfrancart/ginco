/* Copyright or © or Copr. Ministère Français chargé de la Culture et de la Communication (2013)

contact.gincoculture.gouv.fr

This software is a computer program whose purpose is to provide a thesaurus management solution. 
This software is governed by the CeCILL license under French law and abiding by the rules of distribution of free software.
You can use, modify and/ or redistribute the software under the terms of the CeCILL license as circulated by CEA, CNRS and INRIA at the following URL "http://www.cecill.info".
As a counterpart to the access to the source code and rights to copy, modify and redistribute granted by the license, users are provided only with a limited warranty and the software's author, the holder of the economic rights, and the successive licensors have only limited liability.
In this respect, the user's attention is drawn to the risks associated with loading, using, modifying and/or developing or reproducing the software by the user in light of its specific status of free software,that may mean that it is complicated to manipulate, and that also therefore means that it is reserved for developers and experienced professionals having in-depth computer knowledge. Users are therefore encouraged to load and test the software's suitability as regards their requirements in conditions enabling the security of their systemsand/or data to be ensured and, more generally, to use and operate it in the same conditions as regards security.
The fact that you are presently reading this means that you have hadknowledge of the CeCILL license and that you accept its terms.
*/
package fr.mcc.ginco.hibernate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    public static final SessionFactory sessionFactory;
    static {
        try {
            sessionFactory = new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    /*
     * Récupére la session associée au thread courant et initialise la
     * transaction si nécessaire
     */
    public static Session getCurrentSession() {
        Session session = sessionFactory.getCurrentSession();
        if (session.getTransaction() == null || !session.getTransaction().isActive())
            session.beginTransaction();
        return session;
    }

    /*
     * Commit et fermeture de session
     */
    public static void commit() {
        Session session = getCurrentSession();
        Transaction transaction = session.getTransaction();
        if (!transaction.wasCommitted() && !transaction.wasRolledBack())
            session.getTransaction().commit();
    }

    /*
     * Rollback et fermeture de session
     */
    public static void rollback() {
        Session session = getCurrentSession();
        Transaction transaction = session.getTransaction();
        if (!transaction.wasCommitted() && !transaction.wasRolledBack())
            session.getTransaction().rollback();
    }
}

