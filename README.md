# image-reshaper

It's an API that you can use so as to reshape your image. 

You can send your image content as base64 format and changes it's type, height, width and quality.

Below you can find an example request that generates 3 separate images of which width, height and quality definitions has been specified.

```bash
curl -X 'POST' \
  'https://image-reshaper.vercel.app/api/v1/images' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "content": "UklGRloFAABXRUJQVlA4IE4FAABQKwCdASosASwBPp1OpE2lpCOiIEiYsBOJaW7hdKEb60DrAcsvLB7msC/8d7Jf2DvB2nd3Guo8G3VW70f5D0SeJvoAfmz/q/bN8Y//X5evob/z+4d+sf/B7D3o2ft2DemviIPpr4iD6a+Ig+mviIPpr4iD6a+Ig+mviIPpr4iD6a+Ig+mviIPpr4iD6a+Ig+mviIPpr4iD6a+Ig+mviIPpr4iD55Pt42YUgbPRzHQM5+SvGBV4ApeIGxgZCtaxAhfCqB9pjHs6l3c19CVuGBF/56vK6pOPIaMwYV5pIqYp1sctIRTCAnJez9/01qBw5byl1eZ8OfeyeryPUznNmvoTWx0RcOopEYWm+Whpgjb5kKZaMHeYmkQDMRB4zt9TXxEH018RB9NfEQfTXxEH018RB9NfEQfTXxEH018RB9NfEQfTXxEH018RB9NfEQfTXxEH018RB9NfEQfTXxEH018RB6AAAP7/UlQAQAAAAHKeq866TQJyDmfH3r8Etxvu63R/Tn55yAsLYjLg10p89Yb0OKZy+dIZx5kv/3LOh0n947U6Y/KivCfDWFh5nwy1Yp/4OD/vca2vZo9xOp/q+7wGYcaxf8ndoLNWD0LOEumC/hD5b779xXXnT8kt+O8ZZGpd6rVh6lYoY6VYxYkGLYxgCWcZDUfpTfaljBczfYPGLnRgqyjeepsamODrT1um+Eh8PPD2cvgNYu4NkwLd97W5nXrGPxpARI3zDMMABbIFSMPhr/6TaLXKDfxjj6/IXsqnA6JEMpBV2Wn+3cJEeX+yBQ55BsI8Cg/sZNXV/Mu6mvdgMCR6b4SYOGZKc2ewL9kS73LOJ93R8oQX8m4S4JicGMWv5Z2lBLHxGADjrC8OrIAp9uj8rcbLsBBIkAYIsPWXvNyISOJjYWb/N7bjHhqhVD6g09QudbmwNM8vyoHjCaJYrTkH0p3KmAx9i2A2syPaYSLQPOnMMPa9+uAqXBqdrtg2eLSGZA5/jP737HNKVIM7xVg/3TTvvzJr7VTwlUociY+jLcigGSuVPTAH3eVkQQwFXLqPkdLh4IVMtjnkaz5/TgCCeWrud5uSAgQn5KhAI2G6Fff8rLb9RCKv3qLuiG11xSMZZKUbqmsOcnSXdqAeA2OLM4gxbESVSDK/g8D1kAa75cgnTIQYnAiLn2wFDNXS9W9v/Jebrs6zyWUoyelGPU5CjzuH5AX6dmoeeYJcmBgK2gkCIXs/8/6L06vH63WYmwV5qbeSrYXxdm+Ji56hGd8v/EKTsLmX/u1gjpCSoOLN7g0jurF3364xkyZ3ZTvn24TZcKWhHzRmPMm2Wwu813ggYIdSFvdK9o9Lj039TMDz/L89SmwqUWUbMvN1naCq8Evmlx3qkYv7pEq1vMPVCt1g1TRB316keh2/HugEhZ2VtwKy+7fxJSb6ox+bFQ9jyxwSIPGt+TYUZyRG+wzsMdfG5FyWjYEyM5hHu5wh6puNnK3u7/N32gR/CzrFSCn0l3E4YajBEXIxq4fXllcYtGdXnzfb0xYNrRvUw4STrerQ0yU/6H8pfMVO2w1OXr2jduPgmrfmZLHRNnvb3MoB2fHRX5VLrZ66hmyF2p79OWpD/8qL5sARgxA2KXzAFPIpprn1MO5eF4n4q6A7ZV1fS2ROoLPVWNiQKrgMI6Hnyu7omqmQa5Nuk9wPZQHMnI78Sjp4dhcXJL7d2tqXq0SBly5p/aLWWG9o7sk5hKxMJwWUuEvSN/g1Xe7bRl4cK5U1ibq1mMWrCFn1bTqEckr7aUUkOjEP6hqBGzQHkmSFovdEKzeeAAAAAAAAAA==",
  "options": [
    {
      "extension": 1,
      "quality": null,
      "width": 400,
      "height": 500
    },
    {
      "extension": 1,
      "quality": null,
      "width": 100,
      "height": 100
    },
    {
      "extension": 3,
      "quality": 85,
      "width": 300,
      "height": 300
    }
  ]
}'
```

## Field Descriptions

Request Body:

```
{
  "content": string,
  "options": [
    {
      "extension": integer,
      "quality": nullable-integer,
      "width": integer,
      "height": integer
    }
  ]
}
```

| Field | Description |
| ----- | ----------- |
| content | Image content that should be base64 format |
| options | It's an array at least one item should exist. At most five items are supported |
| options.0.extension | Image type that wants to be generated. Supported values: JPG = 1, WEBP = 2, PNG = 3 |
| options.0.quality | It's a nullable field. Default value is 85. The expected value interval is [1-100]
| options.0.width | Image width that wants to be generated |
| options.0.height | Image height that wants to be generated |

Response:
```
{
  "images": [
    {
      "content": string,
      "width": integer,
      "height": integer,
      "quality": nullable-integer,
      "extension": integer
    }
  ]
}
```
| Field | Description |
| ----- | ----------- |
| images | It's an array that contains generated image information |
| images.0.content | Generated image content which is base64 format |
| images.0.width | The image width that has been specified in request |
| images.0.quality | The image quality that has been specified in request |
| images.0.height | The image height that has been specified in request |