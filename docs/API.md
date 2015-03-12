#API

## Data endpoint

		POST /api/v1/storage/:storageId:/data

The data endpoint serves as the unique entrypoint to save data. All data needs to be related to a storage.

Depending on the type of data, the structure of the body will change. The type is determined by the storage type.

### status

		{
			"storage": 1,
			"value": "ok"
		}

		Accepted values are: "ok", "error", "warning"

### counter

		{
			"storage": 1,
			"value": "25"
		}

### graph

		{
			"storage": 1,
			"value": "25"
		}

### map

		{
			"storage": 1,
			"value": {
				"latitude": "somelatitude",
				"longitude": "somelongitude",
				"value": "25"
			}
		}

### completion

		{
			"storage": 1, 
			"value": {
				"current": 25,
				"min": 0,
				"max": 100
			}
		}

### message

		{
			"storage": 1,
			"value": {
				"title": "Hello World",
				"image": "http://example.com/optional_image.png",
				"content": "Some message",
				"link": "An optional url"
			}
		}
