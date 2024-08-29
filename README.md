# Improve Python code performance with asyncio

When our python code becomed slow, it is common that we try to improve the performance by using another algorithm or even use multi threading for that.
However, just by changing the code to run in asynchronous, in some case is the most simple and straight forward solution. This time, let's look at a specific problem below and see how we can achieve a sweet speed with some simple changes.

The problem:

> Calling 3 API endpoints continiously.
> Assuming each API requires 2 seconds until completion.
> The code will requires about 6 seconds to finish.

The solution:

- One solution is to apply concurrency, create 3 threads to call API in parallel. Very do-able, but managing threads is complex and we still need to wait for about 2 seconds before doing anything else.

- Another solution is to use async, which will only dispatch the API calls. It won't wait until all API calls complete. Instead, the code keeps executing further and will be notified when API calls completed.

Now, we will take a look at how the problem will be solve with the later approach - using async.

## Creating a dummy server

`time.sleep` may sufficient as an example. But let's create a server to make this more real.

First, spawn an virtualenv and add some depencencies quickly.

```bash
$ python -m virtualenv venv
$ source venv/bin/activate
$ pip install fastapi

```

Then, create a simple server.

```python
# server.py
import time
from fastapi import FastAPI


app = FastAPI()

@app.get("/ping")
def ping():
    time.sleep(2)
    return "pong"  # It just response a simple text after 2s of waiting
```

Finally, run the server.

```bash
$ fastapi dev server.py
```

We now have a dummy server for playing around.

## Fetch API sync

Let's stimulate the problem of sync code.

First, let's launch up Python cli and create some requests.

```python
import time
import requests


def run_in_sync():
    s = time.perf_counter()  # Spawn a time tracker
    for i in range(3):  # Call API 3 times
        print(requests.get("http://localhost:8000/ping).text)
    print(time.perf_counter() - s)

run_in_sync()
print("doing other things")
```

Run the code and we will get.

```bash
$ "pong"
$ "pong"
$ "pong"
$ 6.031
$ "doing other things"
```

Could you see that we need to wait for 6s before we can do other thing? Yes, absolutely a waste, our computer just waiting for API to fetch until it can do other thing. So literally, it could be so much faster just by ... do not wait anymore. Let's see how we can achieve this in async way.

## The async solution

All async functionalities are provided in `asyncio` module. Let's import it and quickly scratch some code.

```python
import asyncio
import time


async def run_in_async():
    s = time.perf_counter()  # Again, spawn a time tracker
    loop = asyncio.get_event_loop()
    for i in range(3):
        print((await loop.run_in_executor(None, requests.get, 'http://localhost:8000/ping')).text)
    print(time.perf_counter() - s)

asyncio.run(run_async())
print("do other thing")
```

And here is the result.

```bash
$ "doing other things"
$ "pong"
$ "pong"
$ "pong"
$ 2.017
```

Interesting right?

- The code does not wait for API at all! It just do other thing while the API is fetching
- The code will resume the logic after API calls are finished, which is `print(time.perf_counter() - s)`
- The API calls are dispatched at a same time and response back the latest is about 2s. In another word, it does not matter how many API calls we make, the wait time won't increase by that, but determined by the slowest API call.

## Conclution

The power of async relies on its character that it does not wait, at all. So as long as a task is not necessary to run in sync mode (probably I/O related). We can always use async to easily gain some performance.

However, it is also necessary to remind that. For the task that is sync in its nature, such as file processing. Using async will increase complexity of our code (as you can see that the async code is a little bit more complicated than the sync one) without gaining any performance.

Nowadays, cloud developing becomes popular, so mostly small services are communicating with each other over the network. Therefore, async, naturally becomes more and more popular, as how convinient as it is.

Thank you for reading!
