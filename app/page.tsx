'use client'
import Table from "@/components/table";
import { useEffect, useState } from "react";
import Auth from "../components/auth";
import { useAuth } from "./providers/auth";



export default function Home() {
  const { userId } = useAuth();
  const [allTickets, setAllTickets] = useState([]);
  const [unhandledTickets, setUnhandledTickets] = useState([]);
  const [userLockedTickets, setUserLockedTickets] = useState([]);
  const [userHandledTickets, setUserHandledTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const headers = {
          'Authorization': userId
        }
        const allTicketsResponse = await fetch('http://localhost:8080/tickets', { headers });
        if (!allTicketsResponse.ok) {
          throw new Error('Failed to fetch tickets');
        }
        setAllTickets(await allTicketsResponse.json());


        const unhandledTicketsResponse = await fetch('http://localhost:8080/tickets?unhandled=true', { headers });
        if (!unhandledTicketsResponse.ok) {
          throw new Error('Failed to fetch tickets');
        }
        setUnhandledTickets(await unhandledTicketsResponse.json());


        const userLockedTicketsResponse = await fetch('http://localhost:8080/users/me/tickets?locked=true', { headers });
        if (!userLockedTicketsResponse.ok) {
          throw new Error('Failed to fetch tickets');
        }
        setUserLockedTickets(await userLockedTicketsResponse.json());

        const userHandledTicketsResponse = await fetch('http://localhost:8080/users/me/tickets?handled=true', { headers });
        if (!userHandledTicketsResponse.ok) {
          throw new Error('Failed to fetch tickets');
        }
        setUserHandledTickets(await userHandledTicketsResponse.json());
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchTickets();
    }
  }, [userId]);

  return !userId ? <Auth /> : null

}
