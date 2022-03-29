## Plan
* [x] Name the new issue like this: 'Story: \<who\> \<does what\> \<why>\'
* [x] Describe the objectives of the user story.
* [x] Create a written user journey. 
    * [x] Describe the interactions the user will take. 
    * [x] Describe what the user will see.
    * [x] Describe conditional situations.
* [x] Create visual wireframes if applicable. (upload attachment)
* [x] Create/edit UML diagrams with Mermaid.
* [x] Remove "Planning" label from issue and add "Planning Complete".

## Objectives
As a user I can view a user's profile and see their name, bio, and cover photo. Also display a list of their blogs.

## User Journey
* User starts on admin home page.
* User clicks on profile link.
* Profile page loads and user sees:
  * Name
  * Description
  * Cover photo
  * Wallet Address
  * URL
* Users sees a list of the author's blogs
  * Title
  * Description
  * Cover photo
  * Category
  * Locked/unlocked

## UML Diagram(s)
```mermaid
classDiagram

class Author
Author : +string _id 
Author : +string _rev 

Author : +string name
Author : +string description
Author : +Image coverPhoto
Author : +string walletAddress


class AuthorService
AuthorService : +Author get(_id)

class ChannelService
ChannelService : +Channel[] list(number limit, string startKey)
```
