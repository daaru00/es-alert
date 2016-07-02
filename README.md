# Elasticsearch Alert
### alerting system for Elasticsearch

Basic feature:

* Exec a query to Elastisearch and notify you when it return a result
* Email you with the selected value of query result
* No Realert option (will not receive thundreds of emails)

Dependencies:

* [nodejs](https://nodejs.org/en/download/package-manager/)

### Installation

Download or clone this repository

```bash
wget https://github.com/Daaru00/es-alert/archive/master.zip
unzip master.zip
cd es-alert-master
```

Install __npm__ dependencies

```bash
npm install
```

Test it (get current version)

```bash
./es-alert -v
```


### Install as Linux service

Launch installation

```bash
./es-alert --install
```

### Client command

```bash
-i, --install	  install as service
-u, --uninstall	  uninstall service
-v, --version	  print current version
-d, --debug		  launch in debug mode
```

### Configuration

Open __settings.json__ file and edit it

```
{
    "elasticsearch": {
        "host": "http://localhost:9200",
        "log": false,
        "maxRetries": 3,
        "requestTimeout": 30000,
        "keepAlive": true
    },
    "alerter":{
        "email":{
            "from": "Elasticsearch Alert",
            "user": "user@gmail.com",
            "password": "password",
            "host": "smtp.gmail.com",
            "ssl": true,
            "to": "you@example.com"
        },
        "log":{
            "path": "/path/to/log/alerts.log"
        }
    }
}
```

### Create new alert

Create a new jsonfile inside __alerts__ directory or edit __alerts/cpu_usage.json__ example

```
{
    "name": "CPU Usage > 60%",
    "frequency": "10s",
    "search": {
        "index": "topbeat-*",
        "body": {
            "query": {
                "filtered" : {
                    "query" : {
                        "term" : { "type" : "system" }
                    },
                    "filter" : {
                        "and" : [
                            {
                                "range" : {"@timestamp" : {"gte" : "now-10s"}}
                            },
                            {
                                "range" : {"cpu.user_p" : {"gte" : 0.06}}
                            }
                        ]
                    }
                }

            }
        }
    },
    "select": "beat.hostname",
    "transports": ["log", "email"],
    "noRealert": "10m"
}
```

Alert options definitions:

__name__ the name of alarm (it is not necessary that it is unique, will using filename as id)

__frequency__ checking frequency [30s, 1m, 5m, 1h..]

__search__ the elastisearch query object, more option is avaiable here: [Search Operations](https://www.elastic.co/guide/en/elasticsearch/client/php-api/current/_search_operations.html) and [Filtered Query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-filtered-query.html). This is the same paramater as [elasticsearch-js client.search](https://github.com/elastic/elasticsearch-js#examples)

__select__ value to append into log or email content (in this example I used the hostname)

__transports__ log transports, currently log and email is avaible, change the global settings into _settings.json_ file

__noRealert__ his is the way through which we control not getting too many alerts for the same alert, one notification every time period [30s, 1m, 5m, 1h..]

### Launch it

If you use it as service
```bash
service es-alert start
```

Launch it and see the output
```bash
./es-alert -d
```

### notes

this project is currently in test
