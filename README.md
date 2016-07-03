# Elasticsearch Alert
### alerting system for Elasticsearch

Basic feature:

* Exec a query to Elastisearch and notify you when it return a result
* Email you with the selected value of query result
* No Realert option (will not receive thundreds of emails)

Dependencies:

* [nodejs](https://nodejs.org/en/download/package-manager/)
* [npm](https://docs.npmjs.com/getting-started/)

install dependencies (on ubuntu)

```bash
sudo apt-get install nodejs npm
```

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

```json
{
    "log": true,
    "logPath": "/var/log/es-alert",
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
        },
        "telegram":{
            "token": "",
            "to": "@channelusername"
        },
        "pushover":{
            "user": "",
            "token": "",
            "device": "",
            "sound": "incoming"
        }
    }
}
```
logPath is used to store core log files when it is launched as service

### Create new alert

Create a new jsonfile inside __alerts__ directory or edit __alerts/cpu_usage.json__ example

```json
{
    "name": "HTTP packets in > 10M",
    "frequency": "10s",
    "search": {
        "index": "packetbeat-*",
        "body": {
            "query": {
                "filtered" : {
                    "query" : {
                        "term" : { "type" : "http" }
                    },
                    "filter" : {
                        "and" : [
                            {
                                "range" : {"@timestamp" : {"gte" : "now-10s"}}
                            },
                            {
                                "range" : {"bytes_in" : {"gte" : 100}}
                            }
                        ]
                    }
                }

            }
        }
    },
    "select": "beat.hostname,path,client_ip",
    "transports": ["log", "email"],
    "noRealert": "10m"
}
```

Alert options definitions:

__name__ the name of alarm (it is not necessary that it is unique, will using filename as id)

__frequency__ checking frequency [30s, 1m, 5m, 1h..]

__search__ the elastisearch query object, more option is avaiable here: [Search Operations](https://www.elastic.co/guide/en/elasticsearch/client/php-api/current/_search_operations.html) and [Filtered Query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-filtered-query.html). This is the same paramater as [elasticsearch-js client.search](https://github.com/elastic/elasticsearch-js#examples)

__select__ value to append into log or email content (in this example I used the hostname), multivalues is also avaiable (separated by comma)

__transports__ log transports, currently log, email, telegram and pushover are avaible, change the global settings into _settings.json_ file

__noRealert__ his is the way through which we control not getting too many alerts for the same alert, one notification every time period [30s, 1m, 5m, 1h..]

### Transports

__log__ append a row to file on provided path configured in _settings.json_ file, if it not exist will be create

__email__ set server configurations in email setting

__telegram__ activate a new bot and set the _token_ option, set _to_ with @youtusername. You can find more info here: [Telegram bots](https://core.telegram.org/bots)

__pushover__ register on [pushover.net](https://pushover.net/) set in _settings.json_ user, token and device. You can change the notification sound providing a [sound name](https://pushover.net/api#sounds) in _sound_ settings

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
