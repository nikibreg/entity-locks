const express = require("express");
const os = require('os');
const cors = require('cors')

require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://iblsodkucrgudmsefzsh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibHNvZGt1Y3JndWRtc2VmenNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAwNDczODAsImV4cCI6MjA0NTYyMzM4MH0.YDzpmkPPsbBRlULUGnQBVvsNiISVfxhjUoYZ7f58N2Q'
const supabase = createClient(supabaseUrl, supabaseKey, {
    
})

for (let i = 0; i < os.cpus().length; i++) {
    const app = express();
    
    initializeHandlers(app)
        
    app.use(cors({
        origin: ['http://localhost:4200', 'http://localhost:3000'],
        credentials: true
    }));
    
    const port = 3000 + i;
    app.listen(port, err => {
        if (err) {
            console.log(`Failed to listen on PORT ${port}`);
        } else {
            console.log(`Application Server listening on PORT ${port}`);
        }
    });    
}

function initializeHandlers (app, serverName) {
    app.use((req, res, next) => {
        if (req.path === '/auth-simulation') {
            next();
            return;
        }

        if (!req.headers.authorization) {
            res.status(401).json({ error: 'Authorization header required' });
            return;
        }
        const userId = req.headers.authorization;
        req.user = { id: userId };
        next();
    })

    app.post('/auth-simulation', async(req, res) => {
        const userId = Math.random().toString(36).substring(2, 10);
        
        try {
            await initializeDatabase(userId);

            res.status(200).send(userId)
        } catch (error) {
            res.status(500);
        }
    })

    app.get("/tickets", async (req, res) => {
        const { unhandled } = req.query;
        const query = supabase.from('tickets').select('*');
        
        if (unhandled === 'true') {
            query.neq('status', 'handled');
        }

        const { data, error } = await query;

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.json(data);
    });

    app.get("/users/me/tickets", async (req, res) => {
        const { locked, handled } = req.query;

        const query = supabase.from('tickets')
            .select('*')
            .eq('userId', req.user.id);
        
        if (locked === 'true') {
            query.eq('status', 'locked');
        }

        if (handled === 'true') {
            query.eq('status', 'handled'); 
        }

        const { data, error } = await query;

        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }

        res.json(data);
    });

    app.patch("/tickets/:id/handle", (req, res) => {
        console.log(`GET request from ${serverName}: ${req.url}`);
        res.send(`Hello from server ${serverName} - GET request`);
    });
};

async function initializeDatabase(userId) {
    try {
        const { error: deleteTicketsError } = await supabase
            .from('tickets')
            .delete()
            .eq('userId', userId);

        if (deleteTicketsError) {
            console.error('Error deleting tickets:', deleteTicketsError);
            throw deleteTicketsError;
        }

        const { error: insertTicketsError } = await supabase
            .from('tickets')
            .insert([
                {
                    title: 'First Ticket',
                    description: 'Description',
                    comments: ['First comment', 'Second comment', 'Third comment'],
                    status: 'open',
                    createdAt: new Date(),
                    userId
                },
                {
                    title: 'Second Ticket', 
                    description: 'Description',
                    comments: ['Initial comment'],
                    status: 'open',
                    createdAt: new Date(),
                    userId
                },
                {
                    title: 'Third Ticket',
                    description: 'Description',
                    comments: [],
                    status: 'open',
                    createdAt: new Date(),
                    userId,
                }
            ]);

        if (insertTicketsError) {
            console.error('Error inserting tickets:', insertTicketsError);
            throw insertTicketsError;
        }
    } catch (error) {
        console.error('Database initialization failed:', error);
        throw error;
    }
}
