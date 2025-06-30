import discord, requests, os, dotenv
from discord.ext import commands
from dotenv import load_dotenv

#get the secret stuff
load_dotenv()
DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")

#its discord time
intents = discord.Intents.default()
intents.message_content = True  # Needed to read commands

PREFIXES=["bam", "BAM", "Bam"]

#I was trying to make it so that it runs commands with any ammount
# of spaces between the prefix and the command but it dont fkn work so idk its 4am
async def get_prefix(bot, message):
    content = message.content
    for prefix in PREFIXES:
        # Check if message starts with prefix ignoring case
        if content.lower().startswith(prefix.lower()):
            # Now check if after the prefix comes at least one space
            after_prefix = content[len(prefix):]
            if after_prefix.startswith(" ") or after_prefix == "":
                # Return prefix plus a single space for discord.py to parse command args correctly
                return prefix + " "
    # Default fallback prefixes (without space)
    return PREFIXES
bot = commands.Bot(command_prefix=get_prefix, intents=intents)

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user}")


#commands 
@bot.command()
async def ping(ctx):
    await ctx.send("Pong!")


# get random cat pic and embed
@bot.command(aliases=["kitty", "car"])
async def cat(ctx):
    response = requests.get("https://api.thecatapi.com/v1/images/search")
    print(response.status_code)
    if response.ok:
        data = response.json()
        image_url = data[0]["url"]
        cat_id = data[0]["id"]

        embed = discord.Embed(title="BAM CAT UPPON YA 🫴🐱", color=discord.Color.orange())
        embed.set_image(url=image_url)
        embed.set_footer(text=f"look sharp! (id:{cat_id})")

        await ctx.send(embed=embed)

    else:
        await ctx.send("Couldn't fetch a cat right now 😿")



bot.run(DISCORD_TOKEN)
