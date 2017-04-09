#!/bin/bash
#Copyright IBM Corp. 2017. All Rights Reserved.
#Licensed under "The MIT License (MIT)"

# dbserver=$2
# org=$3
# cat=$4

echo policyName=$1
echo dbserver=$dbserver
echo org=$org
echo cat=$cat

if [ "$1" == "authyregister" ] ; then
  echo "curl -k  https://${dbserver}/${org}/${cat}/fatest_reg/register?email=bob@example.com&countrycode=44&phone=07788575123 " \
  ""
  resp=$(curl -k "https://${dbserver}/${org}/${cat}/fatest_reg/register?email=bob@example.com&countrycode=44&phone=07788575123" \
  )
  expected='{"status":"success"}'
  if [ "$resp" == "$expected" ] ; then
    echo "Test Passed";
  else
    echo "Test Failed  - Auth Register - Recieved $resp expected $expected";
    exit 1
  fi

  resp=$(curl -k  "https://${dbserver}/${org}/${cat}/fatest_reg/register?countrycode=44" \
  )
  expected="{ \"httpCode\":\"400\", \"httpMessage\":\"Error getting response from Authy\", \"moreInformation\":\"{\\\"message\\\":\\\"User was not valid\\\",\\\"success\\\":false,\\\"errors\\\":{\\\"email\\\":\\\"is invalid and can't be blank\\\",\\\"cellphone\\\":\\\"is invalid\\\",\\\"message\\\":\\\"User was not valid\\\"},\\\"email\\\":\\\"is invalid and can't be blank\\\",\\\"cellphone\\\":\\\"is invalid\\\",\\\"error_code\\\":\\\"60027\\\"}\" }"
  if [ "$resp" == "$expected" ] ; then
    echo "Test Passed";
  else
    echo "Test Failed  - Auth Register Failure - Recieved $resp expected $expected";
    exit 1
  fi
else
  resp=$(curl -k  "https://${dbserver}/${org}/${cat}/fatest/validate?email=bob@example.co&token=123123" \
   )
  expected='{ "httpCode":"401", "httpMessage":"Token Invalid", "moreInformation":"Requested URL was not found. Please check http://docs.authy.com/ to see the valid URLs" }'
  if [ "$resp" == "$expected" ] ; then
    echo "Test Passed";
    exit 0
  else
    echo "Test Failed  - Auth Validate Failure - Recieved $resp expected $expected";
    exit 1
  fi
fi
