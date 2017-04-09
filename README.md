# APIConnect-Authy

![alt text](https://travis.ibm.com/ukiccte/APIConnect-Authy.svg?token=v5z65wCfSkEqhyt4PqAS "BuildStatus")

# Trust Me!! I use two factor authentication!

## Introduction
Two Factor Authentication is a method that requires a user to provide additional user information in order to authenticate. This article covers how you can add this facility to your APIs using Authy.

Authy is provide a mobile application that generates security tokens with a 60second time to live for custom apps. In order to create your own application an API Key must be registered with them first. For more information on Authy please read their website https://www.authy.com/.

Please Note: In order for this tutorial to work an additional user id issued by Authy must be stored alongside the email address.
￼

## The User Defined Policies

Before you begin a Authy Developer account must be created. Once this is created a Authy Application must be created. In later parts of this article an API Key is referenced this comes from the Authy Application. For more information please read their website https://www.authy.com/

### User Registration
Before two factor authentication can be used the User must be registered with Authy. This can be done via a User Registration API or by interaction directly with Authy administration console.

To do this via an API a User Defined Policy is provided to simplify the construction of the API.
￼
The Policy takes four parameters:
* API Key
* User Email Address
* User Phone Number
* User Country Code

The API Key will come from the Authy Application.

The User parameters are populated from the initial API call. If the UserDefinedPolicy Parameter matches the Parameter for an API then the following format can be used.

{email} or {phone} or {countrycode} .

This User Defined Policy calls Authy with a new user registration and returns a response similar to the below.

If a user is registered with the same details again then the same record is responded.  

The UserID returned must be stored in a persistent along side which ever login credential is provided in the authentication request. For example the email address. The sampleApp provides a very very basic example that will run on bluemix to do this. The API.yaml will provide an example yamp file that will use my deployed bluemix application.

When the user has registered they will have Authy Application listed in the Authy app associated with the provided phone number.

### User Validation
When an API requires two factor authentication the register User Defined Policy must be used. This takes three parameters

The Policy takes four parameters:
* API Key
* User ID
* User Token

The API Key will come from the Authy Application.

The User ID is the value returned when the User is registered. This value should be retrieved from the persistent store with the users email address or other credentials used to look it up.

The User Token is the number currently in the users authy app; the User Token should be taken directly from the API request.

This returns a the following on success

The following on failure.

## Download and Build artefacts

1. Download the latest zip from
2. Load the Policy into API Connect Catalog
