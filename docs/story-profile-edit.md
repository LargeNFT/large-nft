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
As a user I can edit my profile and update my name, bio, and cover photo. 

## User Journey
* User starts on admin home page.
* User clicks on profile link.
* User clicks "Edit" button on profile page.
* Users sees a form with input boxes to enter:
  * Name
  * Description 
  * Cover photo
  * Save button

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
AuthorService : +void put(Author author)

```
