---
title: Dummy
date: March 29, 2017
status: To do
---

A self-hosted open source system for secure exchange of files with clients and partners in a dropbox-like setup. Preventing GDPR compliant sensitive data to reach the unsecure email server.
{: .kicker}

## Problem

Files that contains sensitive data must be handled in accordance with GDPR compliancy.

The client does not want to handle these file through their ordinay email system. Instead they which to have self-contained, seperate solution for handling files that potentially contains sensitive data.

Files must be handled through a secure protocol.


## Features

The client wants a dropbox-like feature where the up- and download of files to and from clients and partners happens through an easy troubleless interface.
{: .kicker}

The following two use cases are described by the client:

### Use case 1 - employee sends file to external partner

The client's employee uploads a file through a web interface, the act may potentially include a login.

The intended reciver will get an automated notification via email, containing a download-link which is only valid for a limited amount of time

### Use case 2 - external partner uploads file to client

The external partner or client has login-free access to a web interface. The files are dragged and dropped on the interface. In the process the external partner will fill in a few properties like, sender, project, case ID.

The attributes will be selected from dropdown boxes to enable files to be consistenly categorized.

An alternative to this use case could be, that the client employee will generate a unique upload-URL for the external pertner to use, with the necessary properties pre-filled.

In any case, the client employee involved in ther partner transaction, will get a notification on email, when a file is recieved.

## Solution

The suggested solution is based on the Open Source project [youtransfer.io](https://www.youtransfer.io/){: target="_blank"} - source code is available from
[`YouTransfer/YouTransfer`](https://github.com/YouTransfer/YouTransfer){: target="_blank"} at GitHub. The project is written in node.js and JavaScript. It will be hosted using a Docker container, either on the clients own premises or in a public cloud (most likely Azure).

The first task is to get the YouTransfer system up and running securely and orchestrated in the client's context, the following tasks will be focusing on extending the features to support, notification, properties, time constraints etc.

The project is managed by the client.

## Value

The value to the client is that files that needs to be handled in accordance with GDPR compliancy never enters into their email systems as attachments.

## Technology stack
Node.js, JavaScript, Less/Sass, Gulp, Docker, Travis CI, Git/GitHub, Karma (test runnner).
