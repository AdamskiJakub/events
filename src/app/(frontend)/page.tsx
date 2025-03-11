import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const events = await payload.find({
    collection: 'events',
    limit: 10,
  })

  return (
    <div className="home">
      <div className="content">
        <h1>Events</h1>
        {user && <p>Logged as: {user.email}</p>}
        <ul>
          {events.docs.map((event) => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              {event.description && <RichText data={event.description} />}
              <p>Start: {new Date(event.startDate).toLocaleDateString()}</p>
              <p>End: {new Date(event.endDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
