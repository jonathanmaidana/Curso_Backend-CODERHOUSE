const config = {
    firebase: {
        "type": "service_account",
        "project_id": "ecommerce-backend-coderh-552d4",
        "private_key_id": "e64c71f362aaf796beae0c6c4fed244dcc1227b1",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDOXB0jWPOgbvzi\nveeTnekdi7NIAMCl3MqUB9iEO2o2veMhgrO/FTy5mpee2AbFJQTGsuWTUA+HesQy\nzp/UzEQKZUbXS+THYOUppNc5n6NDQ73XlTIJL6KH2L2Rh+6ZeVCowYN6Qr/mCjOm\nMkozPKtmEgtTxWYdAoh7/346CeacRRxaxgXDX6tiP6LUSR95TEaYgaJTVgdJIR33\nvGfrawgXu/UXrHHmJjV7coZ1wfGQ9ItcLoRFyMTN02/hEAETaQPdYMqdRA/hLNNc\n0stCG1c4EWso66NR/CVDtniT4SueEvfxZYBET8yIn/0B259rXYAUGN5DrVtKlm+M\nzm7xGKHJAgMBAAECggEAEQ8+pevOPTS7sXt5U+PlsAh65mCQjI2xjhYNdVYLmHGv\nf5dUaH83FVF1SB+MBLuEFvCWZ8yiMgUpR9l6z17hH5pihj0rETv+iegrlkMPHkoQ\n/UvjVmzSkwgtGMU76YJk04Sm68ItptTwUuScq3pwIXirqM3cfJi3Y4faPa5Qmxm6\nBRNOlFoJDDLzYv1LifcimQVRTmv839yYj96sSylvnHG6qhq+iGWAaQUN2gEZhJNv\nxZiFDzv+6ZGHVjH0gd04iB/dlOY8EPFW9Yleq6DHogJuZix/chc0EaCILS5svcts\nO8t0EsqJDjiYvXnqv0cXXEN+WmY0lgxdul8c78VwgQKBgQDqllj1guAVosfKan1e\nXkWFgtdT6gp94KP4hNlCUVeiN4UMTw9COr8Gv6WxzSdVExC+HDvLPvk/sVgTM2Hj\npMh8poS0dk3rYLjHK7KNW3fB4kAUTUKd8kIYNVZzg08QpDZFtwv/hpHdvh9Fxupa\nB0qc5cOixCnSu/QRGmt3FgSrgQKBgQDhMiszONUXI72hi746NZpN5ygUMtYRjqU7\nBT33pvPf4jHcMXZecoFc4o83L506DcDqAaPLYKTbcRNlhwVcOzmUPsLqZykgxz1g\nf9qsMllpGz9BXZ3+eh2ExMbh9wJRfkl9g9uApZ16hJBqriCHet5C0WWqEgxWavM/\n5Mtv+Si6SQKBgQCxqqq3TqauXDmaiSpoJVfb9StmB3Rov5EQMHVnL7oCRrBCkUIK\nM/nnf5BbZ/gpC6Z7hWCX3xrg7Uy6RgkWYv/gwDDziEIdSYTIe8TgIG1D7zn+5kDU\n5Ny//u150PI5tVTRWgABSAcDfPGsZCmrg6gzyiRwCsduLiF8LplDeO6SgQKBgAgT\nMnVdvlZcE7qtNh8EOQo+FbPTttVeVhJtt7EfrXMDu2H37BSq6nSYMyZ5cJvaTmaV\ntHfgeUjdHyLu2oRaI1Brh7W8CT+BpXPGYeL20znvni8L2lR7sH9IRxFnOBAQBTaY\n+c/9IE56XmtU3xm8kCe5NnoIt6SJpTtPSvQy7QDxAoGAG/HksRRZ2Y92d/fI02uO\nWSQv/5OYB4xbzfMrB0quLF6wjUDjVtvezbqw6SKCk3IWUq+DyguR/qiqw0h3SiuD\na2Bv33i2VVs/bUZ9XDP70EpGwXyREWnr1JrtB3j+ZS/MNeDGe9sJW0f5MDFP2VPT\nx4ZsBylH3MA4PA6xXzQrCHw=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-1alvf@ecommerce-backend-coderh-552d4.iam.gserviceaccount.com",
        "client_id": "105935180535191505574",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1alvf%40ecommerce-backend-coderh-552d4.iam.gserviceaccount.com"
    },
    mongodb: {
        conexionDB: 'mongodb://localhost:27017/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    mariadb: {
        client: 'mysql',
            connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ecommerce',
        }
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: './DB/mydb.sqlite3'
        },
        useNullAsDefault: true
    }
}

module.exports = config