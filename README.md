# insight-notes
InsightNotes – A smart note-taking app with AI-powered summarization to condense lengthy notes into key insights. Built with TypeScript, Node.js, Express, and React, InsightNotes helps users capture, organize, and review information efficiently, blending web interactivity with intelligent functionality.


## Configure Mongo in developement
### Step 1: Pull the MongoDB Docker Image
If you haven’t already pulled the MongoDB image, you can do so by running:
<code>docker pull mongo</code>

### Step 2: Start a MongoDB Container
You can start a MongoDB container with a command like this:

<code>docker run --name notes-mongo -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin mongo</code>


Explanation of the Command:
- `--name insight-notes-mongo`: Sets the name of the container to `insight-notes-mongo`. You can change this to any name you prefer.
- `-d`: Runs the container in detached mode (in the background).
- `-p 27017:27017`: Maps the container’s port 27017 (the default MongoDB port) to port 27017 on your local machine.
- `-e MONGO_INITDB_ROOT_USERNAME=admin`: Sets the root username for MongoDB.
- `-e MONGO_INITDB_ROOT_PASSWORD=admin`: Sets the root password for MongoDB.