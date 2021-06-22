## ASIA-PROPERTY ( Backend )

Made with ExpressJS ( Node.js ) & MongoDB, API link - https://asia-property.herokuapp.com

### API Endpoints & Response Examples :

#### Users Endpoints

| Method | Endpoint                                   | Description                   |
| ------ | ------------------------------------------ | ----------------------------- |
| POST   | `/users/register`                          | register as a user            |
| POST   | `/users/login`                             | login as a user/admin         |
| GET    | `/users/get`                               | get all users data            |
| GET    | `/users/get-by-id/${user_id}`              | get user data by id           |
| PUT    | `/users/update?id=${user_id}`              | update user data by id        |
| PUT    | `/users/update-user-profile?id=${user_id}` | update user details as a user |
| DELETE | `/users/delete?id=${user_id}`              | delete user by id             |

| Register Field |
| -------------- |
| username       |
| email          |
| phone_number   |
| password       |
| image          |
| country        |
| city           |

| Login Field |
| ----------- |
| email       |
| password    |

| GetAllUsers Field      |
| ---------------------- |
| `access-token` (admin) |

| GetUserById Field      |
| ---------------------- |
| `access-token` (admin) |

| UpdateUserById Field   |
| ---------------------- |
| `access-token` (admin) |
| username               |
| email                  |
| phone_number           |
| role                   |
| image                  |
| country                |
| city                   |

| UpdateUserProfile Field |
| ----------------------- |
| `access-token` (user)   |
| username                |
| email                   |
| phone_number            |
| image                   |
| country                 |
| city                    |

| DeleteUserById Field   |
| ---------------------- |
| `access-token` (admin) |

#### Users GetAll Response

```javascript
{
  "status": "success",
  "message": "Successfully get all users.",
  "results": [
    {
      "role": "user",
      "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--08:14:51-default-user.png",
      "country": "indonesia",
      "city": "batam",
      "_id": "60c49fbda02e303a0b7a2b14",
      "username": "propertyuser",
      "email": "propertyuser@gmail.com",
      "phone_number": "081288880002",
      "password": "$2b$08$rSpIqlHRwHOZYEVIlS9zHONwP1uwnWXyzbHa66v7neZD.Gk3GFmWq",
      "created_at": "2021-06-12T11:51:25.391Z",
      "updated_at": "2021-06-13T08:14:51.162Z",
      "__v": 0
    },
    {
      "role": "admin",
      "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--08:16:44-default-user.png",
      "country": "indonesia",
      "city": "batam",
      "_id": "60c49fd6a02e303a0b7a2b15",
      "username": "propertyadmin",
      "email": "propertyadmin@gmail.com",
      "phone_number": "081288880003",
      "password": "$2b$08$NTT4yIyg.GlPoW21QTlNW.RWQjtH71B0OtYq8wn8WoeDJ/ceQAFI2",
      "created_at": "2021-06-12T11:51:50.021Z",
      "updated_at": "2021-06-13T08:16:44.029Z",
      "__v": 0
    }
  ]
}
```

#### RealEstates Endpoints

| Method | Endpoint                                    | Description                   |
| ------ | ------------------------------------------- | ----------------------------- |
| POST   | `/real-estate/create`                       | create a new real estate data |
| PUT    | `/real-estate/update`                       | update a real estate data     |
| GET    | `/real-estate/get`                          | get all real estates data     |
| GET    | `/real-estate/get-by-id/${realestate_id}`   | get real estate data by id    |
| GET    | `/real-estate/search?search_query=${query}` | search real estates data      |
| DELETE | `/real-estate/delete?id=${realestate_id}`   | delete real estate by id      |

| CreateRealEstate Field     |
| -------------------------- |
| `access-token` (admin)     |
| name                       |
| agent(agent_id)            |
| type                       |
| price                      |
| images[ ] `(can_multiple)` |
| is_featured                |
| status                     |
| address                    |
| country                    |
| city                       |

| UpdateRealEstate Field     |
| -------------------------- |
| `access-token` (admin)     |
| name                       |
| agent(agent_id)            |
| type                       |
| price                      |
| images[ ] `(can_multiple)` |
| is_featured                |
| status                     |
| address                    |
| country                    |
| city                       |

| GetAllRealEstates Field |
| ----------------------- |
| `no_any_field`          |

| GetRealEstateById Field |
| ----------------------- |
| `no_any_field`          |

| DeleteRealEstate Field |
| ---------------------- |
| `access-token` (admin) |

#### RealEstates GetAll Response

```javascript
{
  "status": "success",
  "message": "Successfully get all real estates.",
  "results": [
    {
      "images": [
        "https://asia-property.herokuapp.com/2021-06-13--13:22:28-wallpaper8.jpg",
        "https://asia-property.herokuapp.com/2021-06-13--13:22:28-wallpaper5.jpg"
      ],
      "type": [
        "apartment",
        "villa"
      ],
      "price": "1.000.000.000",
      "is_featured": false,
      "status": "available",
      "country": "indonesia",
      "city": "batam",
      "address": "Jalan Batam no.9",
      "_id": "60c22e15f49b1f20b791328b",
      "name": "Apartment 02",
      "agent": {
        "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--13:03:26-default-agent-pic.jpg",
        "country": "indonesia",
        "city": "tanjung pinang",
        "_id": "60bca4fd033e1d38148d6703",
        "name": "fred+agent+2",
        "email": "fred+agent+2@gmail.com",
        "phone_number": "085800000002"
      },
      "created_at": "2021-06-10T15:21:57.125Z",
      "updated_at": "2021-06-13T13:22:28.741Z",
      "__v": 0
    },
    {
      "images": [
        "https://asia-property.herokuapp.com/2021-06-13--13:23:10-wallpaper8.jpg",
        "https://asia-property.herokuapp.com/2021-06-13--13:23:10-wallpaper5.jpg"
      ],
      "type": [
        "apartment",
        "villa"
      ],
      "price": "1.000.000.000",
      "is_featured": false,
      "status": "available",
      "country": "indonesia",
      "city": "batam",
      "address": "Jalan Batam no.88",
      "_id": "60c36d7fc9afc41487338b52",
      "name": "Apartment 88-edited",
      "agent": {
        "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--13:03:26-default-agent-pic.jpg",
        "country": "indonesia",
        "city": "tanjung pinang",
        "_id": "60bca4fd033e1d38148d6703",
        "name": "fred+agent+2",
        "email": "fred+agent+2@gmail.com",
        "phone_number": "085800000002"
      },
      "created_at": "2021-06-11T14:04:47.507Z",
      "updated_at": "2021-06-13T13:23:10.638Z",
      "__v": 0
    },
  ]
}
```

#### Agents Endpoints

| Method | Endpoint                        | Description             |
| ------ | ------------------------------- | ----------------------- |
| POST   | `/agents/create`                | create a new agent data |
| PUT    | `/agents/update`                | update a agent data     |
| GET    | `/agents/get`                   | get all agents data     |
| GET    | `/agents/get-by-id/${agent_id}` | get agent data by id    |
| DELETE | `/agents/delete?id=${agent_id}` | delete agent by id      |

| CreateAgent Field      |
| ---------------------- |
| `access-token` (admin) |
| name                   |
| email                  |
| phone_number           |
| image                  |
| country                |
| city                   |

| UpdateAgent Field      |
| ---------------------- |
| `access-token` (admin) |
| name                   |
| email                  |
| phone_number           |
| image                  |
| country                |
| city                   |

| GetAllAgents Field    |
| --------------------- |
| `access-token` (user) |

| GetAgentById Field    |
| --------------------- |
| `access-token` (user) |

| DeleteAgent Field      |
| ---------------------- |
| `access-token` (admin) |

#### Agents GetAll Response

```javascript
{
  "status": "success",
  "message": "Successfully get all agents.",
  "results": [
    {
      "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--13:03:07-default-agent-pic.jpg",
      "country": "indonesia",
      "city": "batam",
      "_id": "60bc9f5c033e1d38148d6702",
      "name": "fred+agent+1",
      "email": "fred+agent+1@gmail.com",
      "phone_number": "085800000001",
      "created_at": "2021-06-06T10:11:40.657Z",
      "updated_at": "2021-06-13T13:03:07.276Z",
      "__v": 0
    },
    {
      "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--13:03:26-default-agent-pic.jpg",
      "country": "indonesia",
      "city": "tanjung pinang",
      "_id": "60bca4fd033e1d38148d6703",
      "name": "fred+agent+2",
      "email": "fred+agent+2@gmail.com",
      "phone_number": "085800000002",
      "created_at": "2021-06-06T10:35:41.091Z",
      "updated_at": "2021-06-13T13:03:26.194Z",
      "__v": 0
    }
  ]
}
```

#### FeaturedLists Endpoints

| Method | Endpoint                                      | Description                     |
| ------ | --------------------------------------------- | ------------------------------- |
| POST   | `/featured-list/create`                       | create a new featured list data |
| PUT    | `/featured-list/update`                       | update a featured list data     |
| GET    | `/featured-list/get`                          | get all featured list data      |
| GET    | `/featured-list/get-by-id/${featuredlist_id}` | get featured list data by id    |
| DELETE | `/featured-list/delete?id=${featuredlist_id}` | delete featured list by id      |

| CreateFeaturedList Field |
| ------------------------ |
| `access-token` (admin)   |
| userId                   |
| realEstateId             |

| UpdateFeaturedList Field |
| ------------------------ |
| `access-token` (admin)   |
| userId                   |
| realEstateId             |

| GetAllFeaturedLists Field |
| ------------------------- |
| `access-token` (admin)    |

| GetFeaturedListById Field |
| ------------------------- |
| `access-token` (admin)    |

| DeleteFeaturedList Field |
| ------------------------ |
| `access-token` (admin)   |

#### FeaturedLists GetAll Response ( TODO: Update Response )

```javascript
{
  "status": "success",
  "message": "Successfully get all featured lists.",
  "results": [
    {
      "_id": "60c37f842da1dc22c72fc166",
      "featured_title": "Featured-RealEstate-1",
      "featured_cost": "100.000",
      "user": {
        "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-07--14:49:21-default-product-image.jpg",
        "country": "indonesia",
        "city": "batam",
        "_id": "60be31f19abca124eb510480",
        "username": "userleader",
        "email": "userleader@gmail.com",
        "phone_number": "081288880001",
        "created_at": "2021-06-07T14:49:21.554Z",
        "updated_at": "2021-06-07T14:49:21.578Z",
      },
      "realEstate": {
        "images": [
          "https://asia-property.herokuapp.com/2021-06-13--13:24:13-wallpaper8.jpg",
          "https://asia-property.herokuapp.com/2021-06-13--13:24:13-wallpaper5.jpg"
        ],
        "type": [
          "apartment",
          "villa"
        ],
        "price": "1.000.000.000",
        "is_featured": true,
        "status": "available",
        "country": "indonesia",
        "city": "batam",
        "address": "Jalan Batam no.9",
        "_id": "60c37a9cb8bb6820429a94e1",
        "name": "Apartment 05",
        "agent": "60bca4fd033e1d38148d6703",
        "created_at": "2021-06-11T15:00:44.315Z",
        "updated_at": "2021-06-13T13:24:13.821Z",
      }
    },
    {
      "_id": "60c3810ada992323ae2fc26a",
      "featured_title": "Featured-RealEstate-2",
      "user": {
        "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-07--14:49:21-default-product-image.jpg",
        "country": "indonesia",
        "city": "batam",
        "_id": "60be31f19abca124eb510480",
        "username": "userleader",
        "email": "userleader@gmail.com",
        "phone_number": "081288880001",
        "created_at": "2021-06-07T14:49:21.554Z",
        "updated_at": "2021-06-07T14:49:21.578Z",
      },
      "realEstate": {
        "images": [
          "https://asia-property.herokuapp.com/2021-06-13--13:23:10-wallpaper8.jpg",
          "https://asia-property.herokuapp.com/2021-06-13--13:23:10-wallpaper5.jpg"
        ],
        "type": [
          "apartment",
          "villa"
        ],
        "price": "1.000.000.000",
        "is_featured": false,
        "status": "available",
        "country": "indonesia",
        "city": "batam",
        "address": "Jalan Batam no.88",
        "_id": "60c36d7fc9afc41487338b52",
        "name": "Apartment 88-edited",
        "agent": {
          "image": "https://asia-property.herokuapp.com/public/uploads/2021-06-13--13:03:26-default-agent-pic.jpg",
          "country": "indonesia",
          "city": "tanjung pinang",
          "_id": "60bca4fd033e1d38148d6703",
          "name": "fred+agent+2",
          "email": "fred+agent+2@gmail.com",
          "phone_number": "085800000002",
        },
        "created_at": "2021-06-11T14:04:47.507Z",
        "updated_at": "2021-06-13T13:23:10.638Z",
        "__v": 0
      }
    }
  ]
}
```

---

Backend References :

- mongoDB handbook & setup: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
- multiple uploads: https://codeforgeek.com/multiple-file-upload-node-js/ & https://codeforgeek.com/multiple-file-upload-node-js/
- receiving array upload : https://stackoverflow.com/questions/12756688/is-it-possible-to-send-an-array-with-the-postman-chrome-extension
- create local mongoDB connection: https://zellwk.com/blog/local-mongodb/
