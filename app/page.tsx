'use client'
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

  return !userId ? <Auth /> :
    <div>
      <div className="p-8">
        <div className="flex gap-8 overflow-x-auto min-h-[calc(100vh-4rem)]">
          {/* All Tickets Column */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">All Tickets</h2>
            <div className="space-y-4">
              {allTickets.map((ticket: any) => (
                <div
                  key={ticket.id}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{ticket.title}</h3>
                    {ticket.status === 'locked' && (
                      <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                        🔒 Locked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unhandled Tickets Column */}
          <div className="flex-1 min-w-[300px]">
            <h2 className="text-xl font-bold mb-4">Unhandled Tickets</h2>
            <div className="space-y-4">
              {unhandledTickets.map((ticket: any) => (
                <div
                  key={ticket.id}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{ticket.title}</h3>
                    {ticket.status === 'locked' && (
                      <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                        🔒 Locked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User's Locked Tickets Column */}
          <div className="flex-1 min-w-[300px]">
            <h2 className="text-xl font-bold mb-4">Your Locked Tickets</h2>
            <div className="space-y-4">
              {userLockedTickets.map((ticket: any) => (
                <div
                  key={ticket.id}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{ticket.title}</h3>
                    <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                      🔒 Locked
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User's Handled Tickets Column */}
          <div className="flex-1 min-w-[300px]">
            <h2 className="text-xl font-bold mb-4">Your Handled Tickets</h2>
            <div className="space-y-4">
              {userHandledTickets.map((ticket: any) => (
                <div
                  key={ticket.id}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{ticket.title}</h3>
                    {ticket.status === 'locked' && (
                      <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                        🔒 Locked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
}
