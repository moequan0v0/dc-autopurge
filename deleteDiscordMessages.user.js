// ==UserScript==
// @name        dc-autopurge
// @description dc-autopurge — 基于 victornpb/undiscord 二开的 Discord 消息批量删除工具：反检测优化 + 中英双语界面
// @version     1.0.0
// @author      moequan
// @homepageURL https://github.com/moequan0v0/dc-autopurge
// @supportURL  https://github.com/moequan0v0/dc-autopurge/issues
// @match       https://*.discord.com/app
// @match       https://*.discord.com/channels/*
// @match       https://*.discord.com/login
// @license     MIT
// @namespace   https://github.com/moequan0v0/dc-autopurge
// @grant       none
// @run-at      document-start
// @attribution Original project (https://github.com/victornpb/undiscord)
// ==/UserScript==
(function () {
	'use strict';

	/* rollup-plugin-baked-env */
	const VERSION = "1.0.0";

	var themeCss = (`
/* undiscord window */
#undiscord.browser { box-shadow: 0 0 0 1px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.5); border: 1px solid #1e1f22; overflow: hidden; }
#undiscord.container,
#undiscord .container { background-color: #2b2d31; border-radius: 8px; box-sizing: border-box; cursor: default; flex-direction: column; }
#undiscord .header { background-color: #1e1f22; height: 48px; align-items: center; min-height: 48px; padding: 0 16px; display: flex; color: #b5bac1; cursor: grab; }
#undiscord .header .icon { color: #b5bac1; margin-right: 8px; flex-shrink: 0; width: 24; height: 24; }
#undiscord .header .icon:hover { color: #dbdee1; }
#undiscord .header h3 { font-size: 16px; line-height: 20px; font-weight: 500; font-family: "gg sans","Noto Sans","Helvetica Neue",Helvetica,Arial,sans-serif; color: #f2f3f5; flex-shrink: 0; margin-right: 16px; }
#undiscord .spacer { flex-grow: 1; }
#undiscord select#language { flex-shrink: 0; margin: 0 8px; padding: 4px 6px; border: 1px solid #1e1f22; border-radius: 4px; color: #dbdee1; background-color: #1e1f22; font: inherit; }
#undiscord .header .vert-divider { width: 1px; height: 24px; background-color: #4e5058; margin-right: 16px; flex-shrink: 0; }
#undiscord legend,
#undiscord label { color: #b5bac1; font-size: 12px; line-height: 16px; font-weight: 500; text-transform: uppercase; cursor: default; font-family: "gg sans","Noto Sans","Helvetica Neue",Helvetica,Arial,sans-serif; margin-bottom: 8px; }
#undiscord .multiInput { display: flex; align-items: center; font-size: 16px; box-sizing: border-box; width: 100%; border-radius: 3px; color: #dbdee1; background-color: #1e1f22; border: none; transition: border-color 0.2s ease-in-out 0s; }
#undiscord .multiInput :first-child { flex-grow: 1; }
#undiscord .multiInput button:last-child { margin-right: 4px; }
#undiscord .input { font-size: 16px; width: 100%; transition: border-color 0.2s ease-in-out 0s; padding: 10px; height: 44px; background-color: #1e1f22; border: 1px solid #1e1f22; border-radius: 8px; box-sizing: border-box; color: #dbdee1; }
#undiscord fieldset { margin-top: 16px; }
#undiscord .input-wrapper { display: flex; align-items: center; font-size: 16px; box-sizing: border-box; width: 100%; border-radius: 3px; color: #dbdee1; background-color: #1e1f22; border: none; transition: border-color 0.2s ease-in-out 0s; }
#undiscord input[type="text"],
#undiscord input[type="search"],
#undiscord input[type="password"],
#undiscord input[type="datetime-local"],
#undiscord input[type="number"],
#undiscord input[type="range"] { background-color: #1e1f22; border: 1px solid #1e1f22; border-radius: 8px; box-sizing: border-box; color: #dbdee1; font-size: 16px; height: 44px; padding: 12px 10px; transition: border-color .2s ease-in-out; width: 100%; }
#undiscord .divider,
#undiscord hr { border: none; margin-bottom: 24px; padding-bottom: 4px; border-bottom: 1px solid #4e5058; }
#undiscord .sectionDescription { margin-bottom: 16px; color: #b5bac1; font-size: 14px; line-height: 20px; font-weight: 400; }
#undiscord a { color: #00a8fc; text-decoration: none; }
#undiscord .btn,
#undiscord button { position: relative; display: flex; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; align-items: center; box-sizing: border-box; background: none; border: none; border-radius: 3px; font-size: 14px; font-weight: 500; line-height: 16px; padding: 2px 16px; user-select: none; /* sizeSmall */     width: 60px; height: 32px; min-width: 60px; min-height: 32px; /* lookFilled colorPrimary */     color: rgb(255, 255, 255); background-color: #4e5058; }
#undiscord .sizeMedium { width: 96px; height: 38px; min-width: 96px; min-height: 38px; }
#undiscord .sizeMedium.icon { width: 38px; min-width: 38px; }
#undiscord sup { vertical-align: top; }
/* lookFilled colorPrimary */
#undiscord .accent { background-color: #5865f2; }
#undiscord .danger { background-color: #da373c; }
#undiscord .positive { background-color: #248046; }
#undiscord .info { font-size: 12px; line-height: 16px; padding: 8px 10px; color: #949ba4; }
/* Scrollbar */
#undiscord .scroll::-webkit-scrollbar { width: 8px; height: 8px; }
#undiscord .scroll::-webkit-scrollbar-corner { background-color: transparent; }
#undiscord .scroll::-webkit-scrollbar-thumb { background-clip: padding-box; border: 2px solid transparent; border-radius: 4px; background-color: #1a1b1e; min-height: 40px; }
#undiscord .scroll::-webkit-scrollbar-track { border-color: transparent; background-color: transparent; border: 2px solid transparent; }
/* fade scrollbar */
#undiscord .scroll::-webkit-scrollbar-thumb,
#undiscord .scroll::-webkit-scrollbar-track { visibility: hidden; }
#undiscord .scroll:hover::-webkit-scrollbar-thumb,
#undiscord .scroll:hover::-webkit-scrollbar-track { visibility: visible; }
/**** functional classes ****/
#undiscord.redact .priv { display: none !important; }
#undiscord.redact x:not(:active) { color: transparent !important; background-color: #1e1f22 !important; cursor: default; user-select: none; }
#undiscord.redact x:hover { position: relative; }
#undiscord.redact x:hover::after { content: "Redacted information (Streamer mode: ON)"; position: absolute; display: inline-block; top: -32px; left: -20px; padding: 4px; width: 150px; font-size: 8pt; text-align: center; white-space: pre-wrap; background-color: #111214; -webkit-box-shadow: 0 8px 16px rgba(0,0,0,0.5); box-shadow: 0 8px 16px rgba(0,0,0,0.5); color: #dbdee1; border-radius: 5px; pointer-events: none; }
#undiscord.redact [priv] { -webkit-text-security: disc !important; }
#undiscord :disabled { display: none; }
/**** layout and utility classes ****/
#undiscord,
#undiscord * { box-sizing: border-box; }
#undiscord .col { display: flex; flex-direction: column; }
#undiscord .row { display: flex; flex-direction: row; align-items: center; }
#undiscord .mb1 { margin-bottom: 8px; }
#undiscord .log { margin-bottom: 0.25em; }
#undiscord .log-debug { color: inherit; }
#undiscord .log-info { color: #00b0f4; }
#undiscord .log-verb { color: #72767d; }
#undiscord .log-warn { color: #faa61a; }
#undiscord .log-error { color: #f04747; }
#undiscord .log-success { color: #43b581; }
#undiscord .timingFormula { margin-top: 6px; padding-left: 26px; color: #949ba4; font-size: 12px; line-height: 1.7; font-weight: 400; text-transform: none; cursor: default; }

`);

	var mainCss = (`
/**** dc-autopurge Floating Button ****/
#undicord-btn { position: fixed; right: 24px; bottom: 96px; width: 52px; height: 52px; border-radius: 50%; background-color: #5865f2; color: #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 9999; box-shadow: 0 8px 16px rgba(0,0,0,0.45); transition: transform 0.15s ease, background-color 0.15s ease; outline: none; touch-action: none; user-select: none; -webkit-user-select: none; }
#undicord-btn.dragging { transition: none; cursor: grabbing; transform: scale(1.07); }
#undicord-btn:hover { background-color: #4752c4; transform: scale(1.07); }
#undicord-btn:focus-visible { box-shadow: 0 8px 16px rgba(0,0,0,0.45), 0 0 0 3px rgba(88,101,242,0.55); }
#undicord-btn.open { background-color: #4752c4; }
#undicord-btn img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; pointer-events: none; }
#undicord-btn progress { position: absolute; bottom: -9px; left: 10px; width: 32px; height: 10px; display: none; }
#undicord-btn.running { box-shadow: 0 8px 16px rgba(0,0,0,0.45), 0 0 0 3px #da373c; }
#undicord-btn.running progress { display: block; }
/**** Undiscord Interface ****/
#undiscord { position: fixed; z-index: 100; top: 58px; right: 10px; display: flex; flex-direction: column; width: 800px; height: 80vh; min-width: 610px; max-width: 100vw; min-height: 448px; max-height: 100vh; color: #dbdee1; border-radius: 4px; background-color: #2b2d31; box-shadow: 0 0 0 1px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.5); will-change: top, left, width, height; }
#undiscord .header .icon { cursor: pointer; }
#undiscord .window-body { height: calc(100% - 48px); }
#undiscord .sidebar { overflow: hidden scroll; overflow-y: auto; width: 270px; min-width: 250px; height: 100%; max-height: 100%; padding: 8px; background: #1e1f22; }
#undiscord .sidebar legend,
#undiscord .sidebar label { display: block; width: 100%; }
#undiscord .main { display: flex; max-width: calc(100% - 250px); background-color: #232428; flex-grow: 1; }
#undiscord.hide-sidebar .sidebar { display: none; }
#undiscord.hide-sidebar .main { max-width: 100%; }
#undiscord #logArea { font-family: Consolas, Liberation Mono, Menlo, Courier, monospace; font-size: 0.75rem; overflow: auto; padding: 10px; user-select: text; flex-grow: 1; flex-grow: 1; cursor: auto; }
#undiscord .tbar { padding: 8px; background-color: #1e1f22; }
#undiscord .tbar button { margin-right: 4px; margin-bottom: 4px; }
#undiscord .footer { cursor: se-resize; padding-right: 30px; }
#undiscord .footer #progressPercent { padding: 0 1em; font-size: small; color: #4e5058; flex-grow: 1; }
.resize-handle { position: absolute; bottom: -15px; right: -15px; width: 30px; height: 30px; transform: rotate(-45deg); background: repeating-linear-gradient(0, #4e5058, #4e5058 1px, transparent 2px, transparent 4px); cursor: nwse-resize; }
/**** Elements ****/
#undiscord summary { font-size: 16px; font-weight: 500; line-height: 20px; position: relative; overflow: hidden; margin-bottom: 2px; padding: 6px 10px; cursor: pointer; white-space: nowrap; text-overflow: ellipsis; color: #b5bac1; border-radius: 4px; flex-shrink: 0; }
#undiscord fieldset { padding-left: 8px; }
#undiscord legend a { float: right; text-transform: initial; }
#undiscord progress { height: 8px; margin-top: 4px; flex-grow: 1; }
#undiscord .importJson { display: flex; flex-direction: row; }
#undiscord .importJson button { margin-left: 5px; width: fit-content; }
`);

	var dragCss = (`
[name^="grab-"] { position: absolute; --size: 6px; --corner-size: 16px; --offset: -1px; z-index: 9; }
[name^="grab-"]:hover{ background: rgba(128,128,128,0.1); }
[name="grab-t"] { top: 0px; left: var(--corner-size); right: var(--corner-size); height: var(--size); margin-top: var(--offset); cursor: ns-resize; }
[name="grab-r"] { top: var(--corner-size); bottom: var(--corner-size); right: 0px; width: var(--size); margin-right: var(--offset); 
  cursor: ew-resize; }
[name="grab-b"] { bottom: 0px; left: var(--corner-size); right: var(--corner-size); height: var(--size); margin-bottom: var(--offset); cursor: ns-resize; }
[name="grab-l"] { top: var(--corner-size); bottom: var(--corner-size); left: 0px; width: var(--size); margin-left: var(--offset); cursor: ew-resize; }
[name="grab-tl"] { top: 0px; left: 0px; width: var(--corner-size); height: var(--corner-size); margin-top: var(--offset); margin-left: var(--offset); cursor: nwse-resize; }
[name="grab-tr"] { top: 0px; right: 0px; width: var(--corner-size); height: var(--corner-size); margin-top: var(--offset); margin-right: var(--offset); cursor: nesw-resize; }
[name="grab-br"] { bottom: 0px; right: 0px; width: var(--corner-size); height: var(--corner-size); margin-bottom: var(--offset); margin-right: var(--offset); cursor: nwse-resize; }
[name="grab-bl"] { bottom: 0px; left: 0px; width: var(--corner-size); height: var(--corner-size); margin-bottom: var(--offset); margin-left: var(--offset); cursor: nesw-resize; }
`);

	var buttonHtml = (`
<div id="undicord-btn" tabindex="0" role="button" aria-label="Delete Messages" title="Delete Messages with dc-autopurge">
    <img src="data:image/png;base64,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" alt="" draggable="false">
    <progress></progress>
</div>
`);

	var undiscordTemplate = (`
<div id="undiscord" class="browser container redact" style="display:none;">
    <div class="header">
        <svg class="icon" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
            <path fill="currentColor"
                d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z">
            </path>
        </svg>
        <h3>dc-autopurge</h3>
        <div class="vert-divider"></div>
        <span> Bulk delete messages</span>
        <div class="spacer"></div>
        <select id="language" aria-label="Language" title="Language" style="max-width: 110px;">
            <option value="zh-CN">简体中文</option>
            <option value="en-US">English</option>
        </select>
        <div id="hide" class="icon" aria-label="Close" role="button" tabindex="0">
            <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z">
                </path>
            </svg>
        </div>
    </div>
    <div class="window-body" style="display: flex; flex-direction: row;">
        <div class="sidebar scroll">
            <details open>
                <summary>General</summary>
                <fieldset>
                    <legend>
                        Author ID
                        <a href="{{WIKI}}/authorId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="authorId" type="text" priv>
                        </div>
                        <button id="getAuthor">me</button>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Server ID
                        <a href="{{WIKI}}/guildId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="guildId" type="text" priv>
                        </div>
                        <button id="getGuild">current</button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Channel ID
                        <a href="{{WIKI}}/channelId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input class="input" id="channelId" type="text" priv>
                        </div>
                        <button id="getChannel">current</button>
                    </div>
                    <div class="sectionDescription">
                        <label class="row"><input id="includeNsfw" type="checkbox">This is a NSFW channel</label>
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Wipe Archive</summary>
                <fieldset>
                    <legend>
                        Import index.json
                        <a href="{{WIKI}}/importJson" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input type="file" id="importJsonInput" accept="application/json,.json" style="width:100%";>
                    </div>
                    <div class="sectionDescription">
                        <br>
                        After requesting your data from discord, you can import it here.<br>
                        Select the "messages/index.json" file from the discord archive.
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Filter</summary>
                <fieldset>
                    <legend>
                        Search
                        <a href="{{WIKI}}/filters" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="search" type="text" placeholder="Containing text" priv>
                    </div>
                    <div class="sectionDescription">
                        Only delete messages that contain the text
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasLink" type="checkbox">has: link</label>
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasFile" type="checkbox">has: file</label>
                    </div>
                    <div class="sectionDescription">
                        <label><input id="includePinned" type="checkbox">Include pinned</label>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Pattern
                        <a href="{{WIKI}}/pattern" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="sectionDescription">
                        Delete messages that match the regular expression
                    </div>
                    <div class="input-wrapper">
                        <span class="info">/</span>
                        <input id="pattern" type="text" placeholder="regular expression" priv>
                        <span class="info">/</span>
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Messages interval</summary>
                <fieldset>
                    <legend>
                        Interval of messages
                        <a href="{{WIKI}}/messageId" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input id="minId" type="text" placeholder="After a message" priv>
                        </div>
                        <button id="pickMessageAfter">Pick</button>
                    </div>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input id="maxId" type="text" placeholder="Before a message" priv>
                        </div>
                        <button id="pickMessageBefore">Pick</button>
                    </div>
                    <div class="sectionDescription">
                        Specify an interval to delete messages.
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Date interval</summary>
                <fieldset>
                    <legend>
                        After date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper mb1">
                        <input id="minDate" type="datetime-local" title="Messages posted AFTER this date">
                    </div>
                    <legend>
                        Before date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="maxDate" type="datetime-local" title="Messages posted BEFORE this date">
                    </div>
                    <div class="sectionDescription">
                        Delete messages that were posted between the two dates.
                    </div>
                    <div class="sectionDescription">
                        * Filtering by date doesn't work if you use the "Messages interval".
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Advanced settings</summary>
                <fieldset>
                    <legend>Experimental request profile</legend>
                    <div class="sectionDescription">
                        <label class="row"><input id="captureNativeHeaders" type="checkbox">Capture Discord's native API headers</label>
                    </div>
                    <div class="sectionDescription">
                        Off: the script sets only Authorization in its API requests. On: capture allowlisted headers from Discord requests. The enabled choice is saved locally; captured values stay in this tab's memory and are cleared when disabled.
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Variable pacing</legend>
                    <div class="sectionDescription">
                        <label class="row"><input id="variableTiming" type="checkbox" checked>Vary request intervals and per-pass message count</label>
                        <div class="timingFormula">Search: base × (0.6 ~ 1.8) + 3-15s random<br>Delete: base × (0.6 ~ 1.8)</div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Search delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="searchDelay" type="range" value="30000" step="100" min="100" max="60000">
                        <div id="searchDelayValue"></div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Delete delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="deleteDelay" type="range" value="1000" step="50" min="50" max="10000">
                        <div id="deleteDelayValue"></div>
                    </div>
                    <br>
                    <div class="sectionDescription">
                        This will affect the speed in which the messages are deleted.
                        Use the help link for more information.
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Authorization Token
                        <a href="{{WIKI}}/authToken" title="Help" target="_blank" rel="noopener noreferrer">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="token" type="password" autocomplete="off" priv>
                        </div>
                        <button id="getToken">fill</button>
                    </div>
                </fieldset>
            </details>
            <hr>
            <div></div>
            <div class="info">
                dc-autopurge {{VERSION}}
                <br> moequan
            </div>
        </div>
        <div class="main col">
            <div class="tbar col">
                <div class="row">
                    <button id="toggleSidebar" class="sizeMedium icon">☰</button>
                    <button id="start" class="sizeMedium danger" style="width: 150px;" title="Start the deletion process">▶︎ Delete</button>
                    <button id="stop" class="sizeMedium" title="Stop the deletion process" disabled>🛑 Stop</button>
                    <button id="clear" class="sizeMedium">Clear log</button>
                    <label class="row" title="Hide sensitive information on your screen for taking screenshots">
                        <input id="redact" type="checkbox" checked> Streamer mode
                    </label>
                </div>
                <div class="row">
                    <progress id="progressBar" style="display:none;"></progress>
                </div>
            </div>
            <pre id="logArea" class="logarea scroll">
            </pre>
            <div class="tbar footer row">
                <div id="progressPercent"></div>
                <span class="spacer"></span>
                <label>
                    <input id="autoScroll" type="checkbox" checked> Auto scroll
                </label>
                <div class="resize-handle"></div>
            </div>
        </div>
    </div>
</div>

`);

	const log = {
	  debug() { return logFn ? logFn('debug', arguments) : console.debug.apply(console, arguments); },
	  info() { return logFn ? logFn('info', arguments) : console.info.apply(console, arguments); },
	  verb() { return logFn ? logFn('verb', arguments) : console.log.apply(console, arguments); },
	  warn() { return logFn ? logFn('warn', arguments) : console.warn.apply(console, arguments); },
	  error() { return logFn ? logFn('error', arguments) : console.error.apply(console, arguments); },
	  success() { return logFn ? logFn('success', arguments) : console.info.apply(console, arguments); },
	};

	var logFn; // custom console.log function
	const setLogFn = (fn) => logFn = fn;

	// Helpers
	const msToHMS = s => `${s / 3.6e6 | 0}h ${(s % 3.6e6) / 6e4 | 0}m ${(s % 6e4) / 1000 | 0}s`;
	const escapeHTML = html => String(html).replace(/[&<"']/g, m => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '\'': '&#039;' })[m]);
	const redact = str => `<x>${escapeHTML(str)}</x>`;
	const queryString = params => params.filter(p => p[1] !== undefined).map(p => p[0] + '=' + encodeURIComponent(p[1])).join('&');
	const ask = async msg => new Promise(resolve => setTimeout(() => resolve(window.confirm(msg)), 10));
	const toSnowflake = (date) => /:/.test(date) ? ((new Date(date).getTime() - 1420070400000) * Math.pow(2, 22)) : date;
	const replaceInterpolations = (str, obj, removeMissing = false) => str.replace(/\{\{([\w_]+)\}\}/g, (m, key) => obj[key] || (removeMissing ? '' : m));

	const STORAGE_KEY = 'undiscord-language';
	const SUPPORTED_LOCALES = new Set(['zh-CN', 'en-US']);
	const normalize = value => String(value).trim().replace(/\s+/g, ' ');

	const zhCN = {
	  'Bulk delete messages': '批量删除消息',
	  'Close': '关闭',
	  'Help': '帮助',
	  'General': '常规',
	  'Author ID': '作者 ID',
	  'help': '帮助',
	  'me': '我',
	  'Server ID': '服务器 ID',
	  'current': '当前',
	  'Channel ID': '频道 ID',
	  'This is a NSFW channel': '这是一个成人内容频道',
	  'Wipe Archive': '清理归档',
	  'Import index.json': '导入 index.json',
	  'After requesting your data from discord, you can import it here.': '申请 Discord 数据副本后，可以在这里导入。',
	  'Select the "messages/index.json" file from the discord archive.': '选择 Discord 数据归档中的“messages/index.json”文件。',
	  'Filter': '筛选',
	  'Search': '搜索',
	  'Containing text': '包含文本',
	  'Only delete messages that contain the text': '仅处理包含此文本的消息',
	  'has: link': '包含链接',
	  'has: file': '包含文件',
	  'Include pinned': '包括置顶消息',
	  'Pattern': '正则表达式',
	  'Delete messages that match the regular expression': '仅处理符合正则表达式的消息',
	  'regular expression': '正则表达式',
	  'Messages interval': '消息范围',
	  'Interval of messages': '消息 ID 范围',
	  'After a message': '此消息之后',
	  'Pick': '选择',
	  'Before a message': '此消息之前',
	  'Specify an interval to delete messages.': '指定要处理的消息范围。',
	  'Date interval': '日期范围',
	  'After date': '开始日期',
	  'Messages posted AFTER this date': '处理此日期之后发送的消息',
	  'Before date': '结束日期',
	  'Messages posted BEFORE this date': '处理此日期之前发送的消息',
	  'Delete messages that were posted between the two dates.': '处理两个日期之间发送的消息。',
	  '* Filtering by date doesn\'t work if you use the "Messages interval".': '* 使用“消息范围”时，日期筛选不会生效。',
	  'Advanced settings': '高级设置',
	  'Experimental request profile': '实验性请求头',
	  'Capture Discord\'s native API headers': '采集 Discord 客户端原生 API 请求头',
	  'Off: the script sets only Authorization in its API requests. On: capture allowlisted headers from Discord requests. The enabled choice is saved locally; captured values stay in this tab\'s memory and are cleared when disabled.': '关闭时，脚本在 API 请求中只设置 Authorization。开启后，从 Discord 请求中采集允许列表内的请求头。启用状态保存在本地；采集到的数据仅保存在当前标签页内存中，关闭时清除。',
	  'Experimental request-header capture enabled for this tab.': '已为此标签页开启实验性请求头采集。',
	  'Experimental request-header capture disabled; captured values cleared.': '已关闭实验性请求头采集，并清除已采集数据。',
	  'Variable pacing': '可变节奏',
	  'Vary request intervals and per-pass message count': '随机调整请求间隔和每轮处理数量',
	  'Search: base × (0.6 ~ 1.8) + 3-15s random': '搜索：基准 × (0.6 ~ 1.8) + 3-15 秒随机',
	  'Delete: base × (0.6 ~ 1.8)': '删除：基准 × (0.6 ~ 1.8)',
	  'Search delay': '搜索间隔',
	  'Delete delay': '删除间隔',
	  'This will affect the speed in which the messages are deleted. Use the help link for more information.': '此设置会影响消息处理速度。详情请查看帮助。',
	  'Authorization Token': 'Authorization 令牌',
	  'fill': '自动填入',
	  'Language': '语言',
	  'Start the deletion process': '开始处理消息',
	  '▶︎ Delete': '▶︎ 开始',
	  'Stop the deletion process': '停止处理消息',
	  '🛑 Stop': '🛑 停止',
	  'Clear log': '清空日志',
	  'Hide sensitive information on your screen for taking screenshots': '隐藏屏幕上的敏感信息，便于截图',
	  'Streamer mode': '隐私模式',
	  'Auto scroll': '自动滚动',
	  'Delete Messages': '删除消息',
	  'Delete Messages with dc-autopurge': '使用 dc-autopurge 删除消息',
	  'This 👉': '点此 👉',
	  'Before 👆': '之前 👆',
	  'After 👇': '之后 👇',
	  'This mode will attempt to hide personal information, so you can screen share / take screenshots.\nAlways double check you are not sharing sensitive information!': '此模式会尝试隐藏个人信息，方便共享屏幕或截图。\n请再次确认画面中没有敏感信息！',
	  'Select a message on the chat.\nThe message below it will be deleted.': '在聊天中选择一条消息。\n将处理它之后的消息。',
	  'Select a message on the chat.\nThe message above it will be deleted.': '在聊天中选择一条消息。\n将处理它之前的消息。',
	  'No file selected.': '未选择文件。',
	  'Loaded {{count}} channels.': '已载入 {{count}} 个频道。',
	  'Error parsing file!': '解析文件失败！',
	  'You must fill the "Server ID" field!': '请填写“服务器 ID”！',
	  'Could not automatically detect Authorization Token in local storage!': '无法从本地存储中自动读取 Authorization 令牌。',
	  'Attempting to grab token using webpack': '尝试通过 Discord Webpack 获取令牌。',
	  'Could not find the Guild ID!\nPlease make sure you are on a Server or DM.': '无法获取服务器 ID！\n请确认当前位于服务器或私信页面。',
	  'Could not find the Channel ID!\nPlease make sure you are on a Channel or DM.': '无法获取频道 ID！\n请确认当前位于频道或私信页面。',
	  'Could not automatically detect Authorization Token!': '无法自动读取 Authorization 令牌！',
	  'Please make sure Undiscord is up to date': '请确认 Undiscord 为最新版本。',
	  'Alternatively, you can try entering a Token manually in the "Advanced Settings" section.': '也可以在“高级设置”中手动输入令牌。',
	  'Already running!': '任务正在运行！',
	  'Running batch with queue of {{count}} jobs': '开始处理 {{count}} 个任务。',
	  'Starting job... ({{current}}/{{total}})': '开始任务……（{{current}}/{{total}}）',
	  'Job ended. ({{current}}/{{total}})': '任务完成。（{{current}}/{{total}}）',
	  'Batch finished.': '批量任务已完成。',
	  'Started at {{time}}': '开始时间：{{time}}',
	  'authorId = "{{value}}"': '作者 ID = “{{value}}”',
	  'guildId = "{{value}}"': '服务器 ID = “{{value}}”',
	  'channelId = "{{value}}"': '频道 ID = “{{value}}”',
	  'minId = "{{value}}"': '起始消息 ID = “{{value}}”',
	  'maxId = "{{value}}"': '结束消息 ID = “{{value}}”',
	  'hasLink = {{value}}': '包含链接 = {{value}}',
	  'hasFile = {{value}}': '包含文件 = {{value}}',
	  'Fetching messages...': '正在搜索消息……',
	  'Grand total: {{total}} (Messages in current page: {{page}}, To be deleted: {{delete}}, Skipped: {{skip}}, offset: {{offset}})': '总数：{{total}}（本页：{{page}}，待处理：{{delete}}，跳过：{{skip}}，偏移量：{{offset}}）',
	  'Estimated time remaining: {{time}}': '预计剩余时间：{{time}}',
	  'Waiting for your confirmation...': '等待确认……',
	  'Do you want to delete ~{{total}} messages? (Estimated time: {{time}})\n(The actual number may be lower depending on filters.)\n\n---- Preview ----\n{{preview}}': '确定要处理约 {{total}} 条消息吗？（预计时间：{{time}}）\n（实际数量可能因筛选条件而更少。）\n\n---- 预览 ----\n{{preview}}',
	  'Aborted by you!': '已按你的要求取消。',
	  'OK': '确认',
	  'Stopped by you!': '已停止。',
	  'There\'s nothing we can delete on this page, checking next page...': '本页没有可处理的消息，继续检查下一页……',
	  'Skipped {{skip}} out of {{page}} in this page. (Offset was {{old}}, adjusted to {{next}})': '本页 {{page}} 条中跳过 {{skip}} 条。（偏移量从 {{old}} 调整为 {{next}}）',
	  'Ended because API returned an empty page.': 'API 返回空页，任务结束。',
	  'Waiting {{seconds}}s before next page...': '等待 {{seconds}} 秒后搜索下一页……',
	  'Search request threw an error:': '搜索请求发生错误：',
	  'This channel is not indexed yet. Waiting {{ms}}ms for Discord to index it...': '此频道尚未完成索引，等待 Discord 处理 {{ms}} 毫秒……',
	  'Rate limited by the API. Waiting {{ms}}ms before retrying...': 'API 触发限流，等待 {{ms}} 毫秒后重试……',
	  'Search retries exhausted; stopping to avoid an endless request loop.': '搜索重试次数已用完，任务已停止，避免无限请求。',
	  'Error searching messages, API responded with status {{status}}!': '搜索消息失败，API 返回状态码 {{status}}！',
	  'Retrying in {{ms}}ms... ({{attempt}}/{{max}})': '将在 {{ms}} 毫秒后重试……（{{attempt}}/{{max}}）',
	  'Delete request threw an error:': '删除请求发生错误：',
	  'Delete retry limit reached; skipping this message on the next search.': '删除重试次数已用完，下一次搜索时跳过此消息。',
	  'Delete rate limited. Waiting {{ms}}ms before retrying...': '删除请求触发限流，等待 {{ms}} 毫秒后重试……',
	  'Error deleting message, API responded with status {{status}}!': '删除消息失败，API 返回状态码 {{status}}！',
	  'Failed to parse error response. API responded with status {{status}}!': '无法解析错误响应，API 返回状态码 {{status}}！',
	  'Error deleting message (thread is archived). Skipping it on the next search.': '删除消息失败（帖子已归档），下一次搜索时跳过此消息。',
	  'Ignoring regular expression because the pattern is malformed!': '正则表达式格式错误，已忽略该筛选条件。',
	  'No messages matched the search.': '没有匹配的消息。',
	  'Deleted {{deleted}} messages, {{failed}} failed.': '已处理 {{deleted}} 条消息，{{failed}} 条失败。',
	  'Rate limited {{count}} times.': '触发限流 {{count}} 次。',
	  'Total time throttled: {{time}}.': '限流等待总时长：{{time}}。',
	  'Elapsed: {{elapsed}} Remaining: {{remaining}}': '已用时：{{elapsed}}，剩余：{{remaining}}',
	  'CoreException': '程序错误',
	  'Captured native API headers: {{headers}}': '已捕获的原生 API 请求头：{{headers}}',
	  'Delete delay: {{delete}}ms, Search delay: {{search}}ms': '删除间隔：{{delete}} 毫秒，搜索间隔：{{search}} 毫秒',
	  'Last Ping: {{last}}ms, Average Ping: {{average}}ms': '最近响应：{{last}} 毫秒，平均响应：{{average}} 毫秒',
	  'Ended at {{time}}! Total time: {{duration}}': '结束时间：{{time}}！总用时：{{duration}}',
	};

	const normalizedZhCN = new Map(
	  Object.entries(zhCN).map(([source, translated]) => [normalize(source), translated])
	);

	let locale = 'zh-CN';
	try {
	  const savedLocale = localStorage.getItem(STORAGE_KEY);
	  if (SUPPORTED_LOCALES.has(savedLocale)) locale = savedLocale;
	} catch {
	  // Storage may be unavailable in restricted browser contexts.
	}

	const textSources = new WeakMap();
	const attributeSources = new WeakMap();

	function getLocale() {
	  return locale;
	}

	function setLocale(nextLocale) {
	  if (!SUPPORTED_LOCALES.has(nextLocale)) return locale;
	  locale = nextLocale;
	  try {
	    localStorage.setItem(STORAGE_KEY, locale);
	  } catch {
	    // Keep the selection for this page even if storage is unavailable.
	  }
	  return locale;
	}

	function t(message, values = {}) {
	  const translated = locale === 'zh-CN' ? (normalizedZhCN.get(normalize(message)) || message) : message;
	  return translated.replace(/\{\{([\w]+)\}\}/g, (match, key) =>
	    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match
	  );
	}

	function localizeTree(root, selectedLocale = locale) {
	  const previousLocale = locale;
	  locale = selectedLocale;

	  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
	  let node;
	  while ((node = walker.nextNode())) {
	    if (!textSources.has(node)) textSources.set(node, node.nodeValue);
	    const source = textSources.get(node);
	    const leading = source.match(/^\s*/)[0];
	    const trailing = source.match(/\s*$/)[0];
	    const content = source.slice(leading.length, source.length - trailing.length || source.length);
	    node.nodeValue = `${leading}${t(content)}${trailing}`;
	  }

	  for (const element of root.querySelectorAll('*')) {
	    let sources = attributeSources.get(element);
	    if (!sources) {
	      sources = new Map();
	      attributeSources.set(element, sources);
	    }
	    for (const attribute of ['title', 'placeholder', 'aria-label']) {
	      if (!element.hasAttribute(attribute)) continue;
	      if (!sources.has(attribute)) sources.set(attribute, element.getAttribute(attribute));
	      element.setAttribute(attribute, t(sources.get(attribute)));
	    }
	  }

	  root.dataset.locale = locale;
	  locale = previousLocale;
	}

	const CAPTURED_HEADERS = new Set([
	  'x-super-properties',
	  'x-discord-locale',
	  'x-discord-timezone',
	  'x-installation-id',
	  'x-debug-options',
	]);
	const ENABLED_STORAGE_KEY = 'undiscord-capture-native-headers';
	let capturedHeaders = {};
	let stopCapture = null;

	function pageContext() {
	  return typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
	}

	function isDiscordApiUrl(url, pageWindow) {
	  try {
	    const parsed = new pageWindow.URL(url, pageWindow.location.href);
	    return (parsed.hostname === 'discord.com' || parsed.hostname.endsWith('.discord.com')) && parsed.pathname.startsWith('/api/');
	  } catch {
	    return false;
	  }
	}

	function saveProfile(headers) {
	  const profile = {};
	  headers.forEach((value, name) => {
	    const normalizedName = name.toLowerCase();
	    if (CAPTURED_HEADERS.has(normalizedName)) profile[normalizedName] = value;
	  });
	  if (!Object.keys(profile).length) return;
	  capturedHeaders = { ...capturedHeaders, ...profile };
	}

	function installRequestProfileCapture() {
	  const pageWindow = pageContext();
	  const restorers = [];
	  let active = true;

	  try {
	    const originalFetch = pageWindow.fetch;
	    if (typeof originalFetch === 'function') {
	      const wrappedFetch = function(input, init) {
	        const url = typeof input === 'string' || input instanceof pageWindow.URL ? String(input) : input?.url;
	        if (url && isDiscordApiUrl(url, pageWindow)) {
	          try {
	            const headers = new pageWindow.Headers(input?.headers);
	            if (init?.headers) {
	              new pageWindow.Headers(init.headers).forEach((value, name) => headers.set(name, value));
	            }
	            saveProfile(headers);
	          } catch {
	            // Ignore unsupported header input formats and leave the profile unchanged.
	          }
	        }
	        return originalFetch.apply(this, arguments);
	      };
	      pageWindow.fetch = wrappedFetch;
	      if (pageWindow.fetch === wrappedFetch) {
	        restorers.push(() => {
	          if (pageWindow.fetch === wrappedFetch) pageWindow.fetch = originalFetch;
	        });
	      }
	    }
	  } catch {
	    // The page may make fetch non-writable; the XHR hook can still capture headers.
	  }

	  try {
	    const prototype = pageWindow.XMLHttpRequest?.prototype;
	    if (prototype) {
	      const xhrHeaders = new WeakMap();
	      const originalOpen = prototype.open;
	      const originalSetRequestHeader = prototype.setRequestHeader;
	      const originalSend = prototype.send;

	      const wrappedOpen = function(method, url) {
	        xhrHeaders.set(this, isDiscordApiUrl(url, pageWindow) ? new pageWindow.Headers() : null);
	        return originalOpen.apply(this, arguments);
	      };
	      const wrappedSetRequestHeader = function(name, value) {
	        const headers = xhrHeaders.get(this);
	        if (headers && CAPTURED_HEADERS.has(String(name).toLowerCase())) {
	          try {
	            headers.set(name, value);
	          } catch {
	            // Keep the native XHR call unchanged if a captured value is invalid.
	          }
	        }
	        return originalSetRequestHeader.apply(this, arguments);
	      };
	      const wrappedSend = function() {
	        const headers = xhrHeaders.get(this);
	        if (headers) saveProfile(headers);
	        return originalSend.apply(this, arguments);
	      };

	      prototype.open = wrappedOpen;
	      if (prototype.open === wrappedOpen) restorers.push(() => {
	        if (prototype.open === wrappedOpen) prototype.open = originalOpen;
	      });
	      prototype.setRequestHeader = wrappedSetRequestHeader;
	      if (prototype.setRequestHeader === wrappedSetRequestHeader) restorers.push(() => {
	        if (prototype.setRequestHeader === wrappedSetRequestHeader) prototype.setRequestHeader = originalSetRequestHeader;
	      });
	      prototype.send = wrappedSend;
	      if (prototype.send === wrappedSend) restorers.push(() => {
	        if (prototype.send === wrappedSend) prototype.send = originalSend;
	      });
	    }
	  } catch {
	    // XHR interception is best-effort and does not block Discord requests.
	  }

	  return () => {
	    if (!active) return;
	    active = false;
	    for (const restore of restorers.reverse()) {
	      try {
	        restore();
	      } catch {
	        // Do not block the page if a native method can no longer be restored.
	      }
	    }
	    capturedHeaders = {};
	  };
	}

	function setRequestProfileCaptureEnabled(enabled) {
	  const shouldEnable = Boolean(enabled);
	  try {
	    localStorage.setItem(ENABLED_STORAGE_KEY, shouldEnable ? 'true' : 'false');
	  } catch {
	    // Keep the setting active for this page if storage is unavailable.
	  }

	  if (shouldEnable) {
	    if (!stopCapture) stopCapture = installRequestProfileCapture();
	    return true;
	  }
	  if (stopCapture) stopCapture();
	  stopCapture = null;
	  capturedHeaders = {};
	  return false;
	}

	function getRequestProfileCaptureEnabled() {
	  try {
	    return localStorage.getItem(ENABLED_STORAGE_KEY) === 'true';
	  } catch {
	    return false;
	  }
	}

	function initializeRequestProfileCapture() {
	  if (getRequestProfileCaptureEnabled()) setRequestProfileCaptureEnabled(true);
	}

	function getCapturedRequestHeaders() {
	  return { ...capturedHeaders };
	}

	/**
	 * Delete all messages in a Discord channel or DM
	 * @author moequan <https://github.com/moequan0v0>
	 * Based on Undiscord by Victornpb <https://github.com/victornpb/undiscord>
	 */
	class UndiscordCore {

	  options = {
	    authToken: null, // Your authorization token
	    authorId: null, // Author of the messages you want to delete
	    guildId: null, // Server were the messages are located
	    channelId: null, // Channel were the messages are located
	    minId: null, // Only delete messages after this, leave blank do delete all
	    maxId: null, // Only delete messages before this, leave blank do delete all
	    content: null, // Filter messages that contains this text content
	    hasLink: null, // Filter messages that contains link
	    hasFile: null, // Filter messages that contains file
	    includeNsfw: null, // Search in NSFW channels
	    includePinned: null, // Delete messages that are pinned
	    pattern: null, // Only delete messages that match the regex (insensitive)
	    searchDelay: null, // Delay each time we fetch for more messages
	    deleteDelay: null, // Delay between each delete operation
	    variableTiming: true,
	    maxAttempt: 2, // Attempts to delete a single message if it fails
	    maxSearchAttempts: 5,
	    askForConfirmation: true,
	  };

	  state = {
	    running: false,
	    delCount: 0,
	    failCount: 0,
	    grandTotal: 0,
	    offset: 0,
	    iterations: 0,

	    _searchResponse: null,
	    _messagesToDelete: [],
	    _skippedMessages: [],
	  };

	  stats = {
	    startTime: new Date(), // start time
	    throttledCount: 0, // how many times you have been throttled
	    throttledTotalTime: 0, // the total amount of time you spent being throttled
	    lastPing: null, // the most recent ping
	    avgPing: null, // average ping used to calculate the estimated remaining time
	    etr: 0,
	    lastRetryAfterMs: 0,
	    searchBackoffMs: 0,
	    deleteBackoffMs: 0,
	  };

	  pendingWaits = new Set();

	  // events
	  onStart = undefined;
	  onProgress = undefined;
	  onStop = undefined;

	  resetState() {
	    this.state = {
	      running: false,
	      delCount: 0,
	      failCount: 0,
	      grandTotal: 0,
	      offset: 0,
	      iterations: 0,

	      _searchResponse: null,
	      _messagesToDelete: [],
	      _skippedMessages: [],
	    };

	    this.options.askForConfirmation = true;
	  }

	  /** Automate the deletion process of multiple channels */
	  async runBatch(queue) {
	    if (this.state.running) return log.error(t('Already running!'));

	    this.state.running = true;
	    log.info(t('Running batch with queue of {{count}} jobs', { count: queue.length }));
	    try {
	      for (let i = 0; i < queue.length; i++) {
	        if (!this.state.running) break;
	        const job = queue[i];
	        log.info(t('Starting job... ({{current}}/{{total}})', { current: i + 1, total: queue.length }));

	        // set options
	        this.options = {
	          ...this.options, // keep current options
	          ...job, // override with options for that job
	        };

	        await this.run(true);
	        if (!this.state.running) break;

	        log.info(t('Job ended. ({{current}}/{{total}})', { current: i + 1, total: queue.length }));
	        this.resetState();
	        this.options.askForConfirmation = false;
	        this.state.running = true; // continue running
	      }
	    } finally {
	      this.state.running = false;
	      log.info(t('Batch finished.'));
	      if (this.onStop) this.onStop(this.state, this.stats);
	    }
	  }

	  /** Start the deletion process */
	  async run(isJob = false) {
	    if (this.state.running && !isJob) return log.error(t('Already running!'));

	    this.state.running = true;
	    this.stats.startTime = new Date();
	    this.stats.throttledCount = 0;
	    this.stats.throttledTotalTime = 0;
	    this.stats.lastPing = null;
	    this.stats.avgPing = null;
	    this.stats.lastRetryAfterMs = 0;
	    this.stats.searchBackoffMs = 0;
	    this.stats.deleteBackoffMs = 0;

	    log.success(`\n${t('Started at {{time}}', { time: this.stats.startTime.toLocaleString() })}`);
	    log.debug(
	      t('authorId = "{{value}}"', { value: redact(this.options.authorId) }),
	      t('guildId = "{{value}}"', { value: redact(this.options.guildId) }),
	      t('channelId = "{{value}}"', { value: redact(this.options.channelId) }),
	      t('minId = "{{value}}"', { value: redact(this.options.minId) }),
	      t('maxId = "{{value}}"', { value: redact(this.options.maxId) }),
	      t('hasLink = {{value}}', { value: !!this.options.hasLink }),
	      t('hasFile = {{value}}', { value: !!this.options.hasFile }),
	    );
	    const capturedHeaderNames = Object.keys(getCapturedRequestHeaders());
	    log.info(t('Captured native API headers: {{headers}}', {
	      headers: capturedHeaderNames.length ? capturedHeaderNames.join(', ') : 'none',
	    }));

	    if (this.onStart) this.onStart(this.state, this.stats);

	    try {
	      do {
	      this.state.iterations++;

	      log.verb(t('Fetching messages...'));
	      // Search messages
	      const searchResponse = await this.search();
	      if (!searchResponse || !this.state.running) break;

	      // Process results and find which messages should be deleted
	      this.filterResponse(searchResponse);

	      log.verb(t('Grand total: {{total}} (Messages in current page: {{page}}, To be deleted: {{delete}}, Skipped: {{skip}}, offset: {{offset}})', {
	        total: this.state.grandTotal,
	        page: searchResponse.messages?.length || 0,
	        delete: this.state._messagesToDelete.length,
	        skip: this.state._skippedMessages.length,
	        offset: this.state.offset,
	      }));
	      this.printStats();

	      // Calculate estimated time
	      this.calcEtr();
	      log.verb(t('Estimated time remaining: {{time}}', { time: msToHMS(this.stats.etr) }));

	      // if there are messages to delete, delete them
	      if (this.state._messagesToDelete.length > 0) {

	        if (await this.confirm() === false) {
	          this.state.running = false; // break out of a job
	          break; // immmediately stop this iteration
	        }

	        await this.deleteMessagesFromList();
	      }
	      else if (this.state._skippedMessages.length > 0) {
	        // There are stuff, but nothing to delete (example a page full of system messages)
	        // check next page until we see a page with nothing in it (end of results).
	        const oldOffset = this.state.offset;
	        this.state.offset += this.state._skippedMessages.length;
	        log.verb(t('There\'s nothing we can delete on this page, checking next page...'));
	        log.verb(t('Skipped {{skip}} out of {{page}} in this page. (Offset was {{old}}, adjusted to {{next}})', {
	          skip: this.state._skippedMessages.length,
	          page: searchResponse.messages?.length || 0,
	          old: oldOffset,
	          next: this.state.offset,
	        }));
	      }
	      else {
	        log.verb(t('Ended because API returned an empty page.'));
	        if (isJob) break; // break without stopping if this is part of a job
	        this.state.running = false;
	      }

	      // wait before next page (fix search page not updating fast enough)
	      const pageDelay = this.getPageDelay();
	      log.verb(t('Waiting {{seconds}}s before next page...', { seconds: (pageDelay / 1000).toFixed(2) }));
	      await this.waitWhileRunning(pageDelay);

	      } while (this.state.running);
	    } finally {
	      this.stats.endTime = new Date();
	      log.success(t('Ended at {{time}}! Total time: {{duration}}', {
	        time: this.stats.endTime.toLocaleString(),
	        duration: msToHMS(this.stats.endTime.getTime() - this.stats.startTime.getTime()),
	      }));
	      this.printStats();
	      log.debug(`${t('Deleted {{deleted}} messages, {{failed}} failed.', { deleted: this.state.delCount, failed: this.state.failCount })}\n`);

	      if (!isJob && this.onStop) this.onStop(this.state, this.stats);
	    }
	  }

	  stop() {
	    this.state.running = false;
	    for (const cancelWait of [...this.pendingWaits]) cancelWait();
	  }

	  waitWhileRunning(ms) {
	    if (!this.state.running) return Promise.resolve(false);
	    return new Promise(resolve => {
	      let timer;
	      const finish = continued => {
	        clearTimeout(timer);
	        this.pendingWaits.delete(cancelWait);
	        resolve(continued && this.state.running);
	      };
	      const cancelWait = () => finish(false);
	      this.pendingWaits.add(cancelWait);
	      timer = setTimeout(() => finish(true), Math.max(0, Number(ms) || 0));
	    });
	  }

	  /** Calculate the estimated time remaining based on the current stats */
	  calcEtr() {
	    const perPass = this.options.variableTiming ? 20 : 25;
	    const basePageDelay = Number(this.options.searchDelay) || 0;
	    const pageDelay = this.options.variableTiming
	      ? (basePageDelay * 1.2 + 9000 + this.stats.searchBackoffMs)
	      : basePageDelay + this.stats.searchBackoffMs;
	    const messageDelay = this.options.variableTiming
	      ? (Number(this.options.deleteDelay) || 0) * 1.2 + this.stats.deleteBackoffMs
	      : (Number(this.options.deleteDelay) || 0) + this.stats.deleteBackoffMs;
	    this.stats.etr = (pageDelay * Math.ceil(this.state.grandTotal / perPass)) + ((messageDelay + (this.stats.avgPing || 0)) * this.state.grandTotal);
	  }

	  /** As for confirmation in the beggining process */
	  async confirm() {
	    if (!this.options.askForConfirmation) return true;

	    log.verb(t('Waiting for your confirmation...'));
	    const preview = this.state._messagesToDelete.map(m => `${m.author.username}#${m.author.discriminator}: ${m.attachments.length ? '[ATTACHMENTS]' : m.content}`).join('\n');

	    const answer = await ask(
	      t('Do you want to delete ~{{total}} messages? (Estimated time: {{time}})\n(The actual number may be lower depending on filters.)\n\n---- Preview ----\n{{preview}}', {
	        total: this.state.grandTotal,
	        time: msToHMS(this.stats.etr),
	        preview,
	      })
	    );

	    if (!answer) {
	      log.error(t('Aborted by you!'));
	      return false;
	    }
	    else {
	      log.verb(t('OK'));
	      this.options.askForConfirmation = false; // do not ask for confirmation again on the next request
	      return true;
	    }
	  }

	  async search() {
	    let API_SEARCH_URL;
	    if (this.options.guildId === '@me') API_SEARCH_URL = `https://discord.com/api/v9/channels/${this.options.channelId}/messages/`; // DMs
	    else API_SEARCH_URL = `https://discord.com/api/v9/guilds/${this.options.guildId}/messages/`; // Server

	    let retryCount = 0;
	    const maxAttempts = Math.max(1, Number(this.options.maxSearchAttempts) || 1);
	    while (this.state.running) {
	      let resp;
	      try {
	        this.beforeRequest();
	        resp = await fetch(API_SEARCH_URL + 'search?' + queryString([
	          ['author_id', this.options.authorId || undefined],
	          ['channel_id', (this.options.guildId !== '@me' ? this.options.channelId : undefined) || undefined],
	          ['min_id', this.options.minId ? toSnowflake(this.options.minId) : undefined],
	          ['max_id', this.options.maxId ? toSnowflake(this.options.maxId) : undefined],
	          ['sort_by', 'timestamp'],
	          ['sort_order', 'desc'],
	          ['offset', this.state.offset],
	          ['has', this.options.hasLink ? 'link' : undefined],
	          ['has', this.options.hasFile ? 'file' : undefined],
	          ['content', this.options.content || undefined],
	          ['include_nsfw', this.options.includeNsfw ? true : undefined],
	        ]), {
	          headers: this.getRequestHeaders(),
	        });
	        this.afterRequest();
	      } catch (err) {
	        this.state.running = false;
	        log.error(t('Search request threw an error:'), err);
	        throw err;
	      }

	      if (resp.status === 202 || resp.status === 429) {
	        let body = {};
	        try {
	          body = await resp.json();
	        } catch {
	          // Use the configured delay when the service did not return JSON.
	        }
	        const retryAfter = Number(body.retry_after) * 1000;
	        const fallbackDelay = Math.max(Number(this.options.searchDelay) || 0, 1000);
	        const serverDelay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : fallbackDelay;
	        const nextBackoff = Math.max(serverDelay, this.stats.searchBackoffMs ? this.stats.searchBackoffMs * 2 : fallbackDelay);
	        this.stats.searchBackoffMs = Math.min(nextBackoff, 120000);
	        const waitMs = this.stats.searchBackoffMs;
	        this.stats.throttledCount++;
	        this.stats.throttledTotalTime += waitMs;

	        if (resp.status === 429) {
	          retryCount++;
	          log.warn(t('Rate limited by the API. Waiting {{ms}}ms before retrying...', { ms: Math.ceil(waitMs) }));
	        } else {
	          retryCount++;
	          log.warn(t('This channel is not indexed yet. Waiting {{ms}}ms for Discord to index it...', { ms: Math.ceil(waitMs) }));
	        }

	        if (retryCount >= maxAttempts) {
	          this.state.running = false;
	          log.error(t('Search retries exhausted; stopping to avoid an endless request loop.'));
	          return null;
	        }
	        if (!await this.waitWhileRunning(waitMs)) return null;
	        continue;
	      }

	      if (!resp.ok) {
	        this.state.running = false;
	        let errorBody;
	        try {
	          errorBody = await resp.json();
	        } catch {
	          errorBody = await resp.text();
	        }
	        log.error(t('Error searching messages, API responded with status {{status}}!', { status: resp.status }), errorBody);
	        throw resp;
	      }

	      const data = await resp.json();
	      this.stats.searchBackoffMs = Math.floor(this.stats.searchBackoffMs * 0.5);
	      this.state._searchResponse = data;
	      return data;
	    }
	    return null;
	  }

	  filterResponse(data) {

	    // the search total will decrease as we delete stuff
	    const total = data.total_results;
	    if (total > this.state.grandTotal) this.state.grandTotal = total;

	    // search returns messages near the the actual message, only get the messages we searched for.
	    const discoveredMessages = (data.messages || [])
	      .filter(Array.isArray)
	      .map(convo => convo.find(message => message.hit === true))
	      .filter(Boolean);

	    // we can only delete some types of messages, system messages are not deletable.
	    let messagesToDelete = discoveredMessages;
	    messagesToDelete = messagesToDelete.filter(msg => msg.type === 0 || (msg.type >= 6 && msg.type <= 21));
	    messagesToDelete = messagesToDelete.filter(msg => msg.pinned ? this.options.includePinned : true);

	    // custom filter of messages
	    try {
	      const regex = new RegExp(this.options.pattern, 'i');
	      messagesToDelete = messagesToDelete.filter(msg => regex.test(msg.content));
	    } catch (e) {
	      log.warn(t('Ignoring regular expression because the pattern is malformed!'), e);
	    }

	    // create an array containing everything we skipped. (used to calculate offset for next searches)
	    const skippedMessages = discoveredMessages.filter(msg => !messagesToDelete.find(m => m.id === msg.id));

	    if (this.options.variableTiming && messagesToDelete.length > 15) {
	      const maxPerPass = 15 + Math.floor(Math.random() * 11);
	      messagesToDelete = messagesToDelete.slice(0, maxPerPass);
	    }

	    this.state._messagesToDelete = messagesToDelete;
	    this.state._skippedMessages = skippedMessages;

	  }

	  async deleteMessagesFromList() {
	    for (let i = 0; i < this.state._messagesToDelete.length; i++) {
	      const message = this.state._messagesToDelete[i];
	      if (!this.state.running) return log.error(t('Stopped by you!'));

	      log.debug(
	        // `${((this.state.delCount + 1) / this.state.grandTotal * 100).toFixed(2)}%`,
	        `[${this.state.delCount + 1}/${this.state.grandTotal}] ` +
	        `<sup>${new Date(message.timestamp).toLocaleString()}</sup> ` +
	        `<b>${redact(message.author.username + '#' + message.author.discriminator)}</b>` +
	        `: <i>${redact(message.content).replace(/\n/g, '↵')}</i>` +
	        (message.attachments.length ? redact(JSON.stringify(message.attachments)) : ''),
	        `<sup>{ID:${redact(message.id)}}</sup>`
	      );

	      // Delete a single message (with retry)
	      let attempt = 0;
	      let result;
	      const maxAttempts = Math.max(1, Number(this.options.maxAttempt) || 1);
	      while (attempt < maxAttempts) {
	        result = await this.deleteMessage(message);

	        if (result === 'RETRY') {
	          attempt++;
	          if (attempt >= maxAttempts) break;
	          const retryDelay = Math.max(Number(this.options.deleteDelay) || 0, this.stats.lastRetryAfterMs || 0);
	          log.verb(t('Retrying in {{ms}}ms... ({{attempt}}/{{max}})', {
	            ms: Math.ceil(retryDelay),
	            attempt: attempt + 1,
	            max: maxAttempts,
	          }));
	          if (!await this.waitWhileRunning(retryDelay)) return;
	        }
	        else break;
	      }

	      if (result === 'RETRY') {
	        this.state.failCount++;
	        this.state.offset++;
	        log.error(t('Delete retry limit reached; skipping this message on the next search.'));
	      }

	      this.calcEtr();
	      if (this.onProgress) this.onProgress(this.state, this.stats);

	      if (!await this.waitWhileRunning(this.getMessageDelay())) return;
	    }
	  }

	  async deleteMessage(message) {
	    const API_DELETE_URL = `https://discord.com/api/v9/channels/${message.channel_id}/messages/${message.id}`;
	    let resp;
	    try {
	      this.beforeRequest();
	      resp = await fetch(API_DELETE_URL, {
	        method: 'DELETE',
	        headers: this.getRequestHeaders(),
	      });
	      this.afterRequest();
	    } catch (err) {
	      // no response error (e.g. network error)
	      log.error(t('Delete request threw an error:'), err);
	      this.stats.lastRetryAfterMs = Math.max(Number(this.options.deleteDelay) || 0, 1000);
	      return 'RETRY';
	    }

	    if (!resp.ok) {
	      if (resp.status === 429) {
	        let body = {};
	        try {
	          body = await resp.json();
	        } catch {
	          // Fall back to the configured delay when the service did not return JSON.
	        }
	        const retryAfter = Number(body.retry_after) * 1000;
	        const fallbackDelay = Math.max(Number(this.options.deleteDelay) || 0, 1000);
	        const serverDelay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : fallbackDelay;
	        const nextBackoff = Math.max(serverDelay, this.stats.deleteBackoffMs ? this.stats.deleteBackoffMs * 2 : fallbackDelay);
	        const w = this.stats.deleteBackoffMs = Math.min(nextBackoff, 120000);
	        this.stats.throttledCount++;
	        this.stats.throttledTotalTime += w;
	        this.stats.lastRetryAfterMs = w;
	        log.warn(t('Delete rate limited. Waiting {{ms}}ms before retrying...', { ms: Math.ceil(w) }));
	        this.printStats();
	        return 'RETRY';
	      } else {
	        const body = await resp.text();

	        try {
	          const r = JSON.parse(body);

	          if (resp.status === 400 && r.code === 50083) {
	            // 400 can happen if the thread is archived (code=50083)
	            // in this case we need to "skip" this message from the next search
	            // otherwise it will come up again in the next page (and fail to delete again)
	            log.warn(t('Error deleting message (thread is archived). Skipping it on the next search.'));
	            this.state.offset++;
	            this.state.failCount++;
	            return 'FAIL_SKIP'; // Failed but we will skip it next time
	          }

	          log.error(t('Error deleting message, API responded with status {{status}}!', { status: resp.status }), r);
	          this.state.failCount++;
	          this.state.offset++;
	          return 'FAIL_SKIP';
	        } catch (e) {
	          log.error(t('Failed to parse error response. API responded with status {{status}}!', { status: resp.status }), body);
	          this.state.failCount++;
	          this.state.offset++;
	          return 'FAIL_SKIP';
	        }
	      }
	    }

	    this.stats.deleteBackoffMs = Math.floor(this.stats.deleteBackoffMs * 0.8);
	    this.state.delCount++;
	    return 'OK';
	  }

	  #beforeTs = 0; // used to calculate latency
	  getMessageDelay() {
	    const baseDelay = Math.max(0, Number(this.options.deleteDelay) || 0);
	    return this.options.variableTiming
	      ? Math.round(baseDelay * (0.6 + Math.random() * 1.2) + this.stats.deleteBackoffMs)
	      : baseDelay + this.stats.deleteBackoffMs;
	  }

	  getPageDelay() {
	    const baseDelay = Math.max(0, Number(this.options.searchDelay) || 0);
	    return this.options.variableTiming
	      ? Math.round(baseDelay * (0.6 + Math.random() * 1.2) + 3000 + Math.random() * 12000 + this.stats.searchBackoffMs)
	      : baseDelay + this.stats.searchBackoffMs;
	  }

	  getRequestHeaders() {
	    return {
	      Authorization: this.options.authToken,
	      ...getCapturedRequestHeaders(),
	    };
	  }

	  beforeRequest() {
	    this.#beforeTs = Date.now();
	  }
	  afterRequest() {
	    this.stats.lastPing = (Date.now() - this.#beforeTs);
	    this.stats.avgPing = this.stats.avgPing > 0 ? (this.stats.avgPing * 0.9) + (this.stats.lastPing * 0.1) : this.stats.lastPing;
	  }

	  printStats() {
	    log.verb(
	      t('Delete delay: {{delete}}ms, Search delay: {{search}}ms', {
	        delete: this.options.deleteDelay,
	        search: this.options.searchDelay,
	      }),
	      t('Last Ping: {{last}}ms, Average Ping: {{average}}ms', {
	        last: this.stats.lastPing,
	        average: this.stats.avgPing | 0,
	      }),
	    );
	    log.verb(
	      t('Rate limited {{count}} times.', { count: this.stats.throttledCount }),
	      t('Total time throttled: {{time}}.', { time: msToHMS(this.stats.throttledTotalTime) })
	    );
	  }
	}

	const MOVE = 0;
	const RESIZE_T = 1;
	const RESIZE_B = 2;
	const RESIZE_L = 4;
	const RESIZE_R = 8;
	const RESIZE_TL = RESIZE_T + RESIZE_L;
	const RESIZE_TR = RESIZE_T + RESIZE_R;
	const RESIZE_BL = RESIZE_B + RESIZE_L;
	const RESIZE_BR = RESIZE_B + RESIZE_R;

	/**
	 * Make an element draggable/resizable
	 * @author Victor N. wwww.vitim.us
	 */
	class DragResize {
	  constructor({ elm, moveHandle, options }) {
	    this.options = defaultArgs({
	      enabledDrag: true,
	      enabledResize: true,
	      minWidth: 200,
	      maxWidth: Infinity,
	      minHeight: 100,
	      maxHeight: Infinity,
	      dragAllowX: true,
	      dragAllowY: true,
	      resizeAllowX: true,
	      resizeAllowY: true,
	      draggingClass: 'drag',
	      useMouseEvents: true,
	      useTouchEvents: true,
	      createHandlers: true,
	    }, options);
	    Object.assign(this, options);
	    options = undefined;

	    elm.style.position = 'fixed';

	    this.drag_m = new Draggable(elm, moveHandle, MOVE, this.options);

	    if (this.options.createHandlers) {
	      this.el_t = createElement('div', { name: 'grab-t' }, elm);
	      this.drag_t = new Draggable(elm, this.el_t, RESIZE_T, this.options);
	      this.el_r = createElement('div', { name: 'grab-r' }, elm);
	      this.drag_r = new Draggable(elm, this.el_r, RESIZE_R, this.options);
	      this.el_b = createElement('div', { name: 'grab-b' }, elm);
	      this.drag_b = new Draggable(elm, this.el_b, RESIZE_B, this.options);
	      this.el_l = createElement('div', { name: 'grab-l' }, elm);
	      this.drag_l = new Draggable(elm, this.el_l, RESIZE_L, this.options);
	      this.el_tl = createElement('div', { name: 'grab-tl' }, elm);
	      this.drag_tl = new Draggable(elm, this.el_tl, RESIZE_TL, this.options);
	      this.el_tr = createElement('div', { name: 'grab-tr' }, elm);
	      this.drag_tr = new Draggable(elm, this.el_tr, RESIZE_TR, this.options);
	      this.el_br = createElement('div', { name: 'grab-br' }, elm);
	      this.drag_br = new Draggable(elm, this.el_br, RESIZE_BR, this.options);
	      this.el_bl = createElement('div', { name: 'grab-bl' }, elm);
	      this.drag_bl = new Draggable(elm, this.el_bl, RESIZE_BL, this.options);
	    }
	  }
	}

	class Draggable {
	  constructor(targetElm, handleElm, op, options) {
	    Object.assign(this, options);
	    options = undefined;

	    this._targetElm = targetElm;
	    this._handleElm = handleElm;

	    let vw = window.innerWidth;
	    let vh = window.innerHeight;
	    let initialX, initialY, initialT, initialL, initialW, initialH;

	    const clamp = (value, min, max) => value < min ? min : value > max ? max : value;

	    const moveOp = (x, y) => {
	      const deltaX = (x - initialX);
	      const deltaY = (y - initialY);
	      const t = clamp(initialT + deltaY, 0, vh - initialH);
	      const l = clamp(initialL + deltaX, 0, vw - initialW);
	      this._targetElm.style.top = t + 'px';
	      this._targetElm.style.left = l + 'px';
	    };

	    const resizeOp = (x, y) => {
	      x = clamp(x, 0, vw);
	      y = clamp(y, 0, vh);
	      const deltaX = (x - initialX);
	      const deltaY = (y - initialY);
	      const resizeDirX = (op & RESIZE_L) ? -1 : 1;
	      const resizeDirY = (op & RESIZE_T) ? -1 : 1;
	      const deltaXMax = (this.maxWidth - initialW);
	      const deltaXMin = (this.minWidth - initialW);
	      const deltaYMax = (this.maxHeight - initialH);
	      const deltaYMin = (this.minHeight - initialH);
	      const t = initialT + clamp(deltaY * resizeDirY, deltaYMin, deltaYMax) * resizeDirY;
	      const l = initialL + clamp(deltaX * resizeDirX, deltaXMin, deltaXMax) * resizeDirX;
	      const w = initialW + clamp(deltaX * resizeDirX, deltaXMin, deltaXMax);
	      const h = initialH + clamp(deltaY * resizeDirY, deltaYMin, deltaYMax);
	      if (op & RESIZE_T) { // resize ↑
	        this._targetElm.style.top = t + 'px';
	        this._targetElm.style.height = h + 'px';
	      }
	      if (op & RESIZE_B) { // resize ↓
	        this._targetElm.style.height = h + 'px';
	      }
	      if (op & RESIZE_L) { // resize ←
	        this._targetElm.style.left = l + 'px';
	        this._targetElm.style.width = w + 'px';
	      }
	      if (op & RESIZE_R) { // resize →
	        this._targetElm.style.width = w + 'px';
	      }
	    };

	    let operation = op === MOVE ? moveOp : resizeOp;

	    function dragStartHandler(e) {
	      const touch = e.type === 'touchstart';
	      if ((e.buttons === 1 || e.which === 1) || touch) {
	        e.preventDefault();
	        const x = touch ? e.touches[0].clientX : e.clientX;
	        const y = touch ? e.touches[0].clientY : e.clientY;
	        initialX = x;
	        initialY = y;
	        vw = window.innerWidth;
	        vh = window.innerHeight;
	        initialT = this._targetElm.offsetTop;
	        initialL = this._targetElm.offsetLeft;
	        initialW = this._targetElm.clientWidth;
	        initialH = this._targetElm.clientHeight;
	        if (this.useMouseEvents) {
	          document.addEventListener('mousemove', this._dragMoveHandler);
	          document.addEventListener('mouseup', this._dragEndHandler);
	        }
	        if (this.useTouchEvents) {
	          document.addEventListener('touchmove', this._dragMoveHandler, { passive: false });
	          document.addEventListener('touchend', this._dragEndHandler);
	        }
	        this._targetElm.classList.add(this.draggingClass);
	      }
	    }

	    function dragMoveHandler(e) {
	      e.preventDefault();
	      let x, y;
	      const touch = e.type === 'touchmove';
	      if (touch) {
	        const t = e.touches[0];
	        x = t.clientX;
	        y = t.clientY;
	      } else { //mouse
	        // If the button is not down, dispatch a "fake" mouse up event, to stop listening to mousemove
	        // This happens when the mouseup is not captured (outside the browser)
	        if ((e.buttons || e.which) !== 1) {
	          this._dragEndHandler();
	          return;
	        }
	        x = e.clientX;
	        y = e.clientY;
	      }
	      // perform drag / resize operation
	      operation(x, y);
	    }

	    function dragEndHandler(e) {
	      if (this.useMouseEvents) {
	        document.removeEventListener('mousemove', this._dragMoveHandler);
	        document.removeEventListener('mouseup', this._dragEndHandler);
	      }
	      if (this.useTouchEvents) {
	        document.removeEventListener('touchmove', this._dragMoveHandler);
	        document.removeEventListener('touchend', this._dragEndHandler);
	      }
	      this._targetElm.classList.remove(this.draggingClass);
	    }

	    // We need to bind the handlers to this instance
	    this._dragStartHandler = dragStartHandler.bind(this);
	    this._dragMoveHandler = dragMoveHandler.bind(this);
	    this._dragEndHandler = dragEndHandler.bind(this);

	    this.enable();
	  }

	  /** Turn on the drag and drop of the instance */
	  enable() {
	    this.destroy(); // prevent events from getting binded twice
	    if (this.useMouseEvents) this._handleElm.addEventListener('mousedown', this._dragStartHandler);
	    if (this.useTouchEvents) this._handleElm.addEventListener('touchstart', this._dragStartHandler, { passive: false });
	  }

	  /** Teardown all events bound to the document and elements. You can resurrect this instance by calling enable() */
	  destroy() {
	    this._targetElm.classList.remove(this.draggingClass);
	    if (this.useMouseEvents) {
	      this._handleElm.removeEventListener('mousedown', this._dragStartHandler);
	      document.removeEventListener('mousemove', this._dragMoveHandler);
	      document.removeEventListener('mouseup', this._dragEndHandler);
	    }
	    if (this.useTouchEvents) {
	      this._handleElm.removeEventListener('touchstart', this._dragStartHandler);
	      document.removeEventListener('touchmove', this._dragMoveHandler);
	      document.removeEventListener('touchend', this._dragEndHandler);
	    }
	  }
	}

	function createElement(tag='div', attrs, parent) {
	  const elm = document.createElement(tag);
	  if (attrs) Object.entries(attrs).forEach(([k, v]) => elm.setAttribute(k, v));
	  if (parent) parent.appendChild(elm);
	  return elm;
	}

	function defaultArgs(defaults, options) {
	  function isObj(x) { return x !== null && typeof x === 'object'; }
	  function hasOwn(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
	  if (isObj(options)) for (let prop in defaults) {
	    if (hasOwn(defaults, prop) && hasOwn(options, prop) && options[prop] !== undefined) {
	      if (isObj(defaults[prop])) defaultArgs(defaults[prop], options[prop]);
	      else defaults[prop] = options[prop];
	    }
	  }
	  return defaults;
	}

	function createElm(html) {
	  const temp = document.createElement('div');
	  temp.innerHTML = html;
	  return temp.removeChild(temp.firstElementChild);
	}

	function insertCss(css) {
	  const style = document.createElement('style');
	  style.appendChild(document.createTextNode(css));
	  document.head.appendChild(style);
	  return style;
	}

	const messagePickerCss = `
body.undiscord-pick-message [data-list-id="chat-messages"] {
  background-color: #282b30;
  box-shadow: inset 0 0 0px 2px #5865f2;
}

body.undiscord-pick-message [id^="message-content-"]:hover {
  cursor: pointer;
  cursor: cell;
  background: rgba(88,101,242,0.2);
}
body.undiscord-pick-message [id^="message-content-"]:hover::after {
  position: absolute;
  top: calc(50% - 11px);
  left: 4px;
  z-index: 1;
  width: 65px;
  height: 22px;
  line-height: 22px;
  font-family: "gg sans","Noto Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
  background-color: #4e5058;
  color: #b5bac1;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  border-radius: 3px;
  content: 'This 👉';
}
body.undiscord-pick-message.before [id^="message-content-"]:hover::after {
  content: 'Before 👆';
}
body.undiscord-pick-message.after [id^="message-content-"]:hover::after {
  content: 'After 👇';
}
body[data-undiscord-locale="zh-CN"].undiscord-pick-message [id^="message-content-"]:hover::after {
  content: '点此 👉';
}
body[data-undiscord-locale="zh-CN"].undiscord-pick-message.before [id^="message-content-"]:hover::after {
  content: '之前 👆';
}
body[data-undiscord-locale="zh-CN"].undiscord-pick-message.after [id^="message-content-"]:hover::after {
  content: '之后 👇';
}
`;

	const messagePicker = {
	  init() {
	    insertCss(messagePickerCss);
	  },
	  setLocale(locale) {
	    document.body.dataset.undiscordLocale = locale;
	  },
	  grab(auxiliary) {
	    return new Promise((resolve, reject) => {
	      document.body.classList.add('undiscord-pick-message');
	      if (auxiliary) document.body.classList.add(auxiliary);
	      function clickHandler(e) {
	        const message = e.target.closest('[id^="message-content-"]');
	        if (message) {
	          e.preventDefault();
	          e.stopPropagation();
	          e.stopImmediatePropagation();
	          if (auxiliary) document.body.classList.remove(auxiliary);
	          document.body.classList.remove('undiscord-pick-message');
	          document.removeEventListener('click', clickHandler);
	          try {
	            resolve(message.id.match(/message-content-(\d+)/)[1]);
	          } catch (e) {
	            resolve(null);
	          }
	        }
	      }
	      document.addEventListener('click', clickHandler);
	    });
	  }
	};
	window.messagePicker = messagePicker;

	function getToken() {
	  window.dispatchEvent(new Event('beforeunload'));
	  const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
	  try {
	    return JSON.parse(LS.token);
	  } catch {
	    log.info(t('Could not automatically detect Authorization Token in local storage!'));
	    log.info(t('Attempting to grab token using webpack'));
	    return (window.webpackChunkdiscord_app.push([[''], {}, e => { window.m = []; for (let c in e.c) window.m.push(e.c[c]); }]), window.m).find(m => m?.exports?.default?.getToken !== void 0).exports.default.getToken();
	  }
	}

	function getAuthorId() {
	  const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
	  return JSON.parse(LS.user_id_cache);
	}

	function getGuildId() {
	  const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
	  if (m) return m[1];
	  else alert(t('Could not find the Guild ID!\nPlease make sure you are on a Server or DM.'));
	}

	function getChannelId() {
	  const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
	  if (m) return m[2];
	  else alert(t('Could not find the Channel ID!\nPlease make sure you are on a Channel or DM.'));
	}

	function fillToken() {
	  try {
	    return getToken();
	  } catch (err) {
	    log.verb(err);
	    log.error(t('Could not automatically detect Authorization Token!'));
	    log.info(t('Please make sure Undiscord is up to date'));
	    log.debug(t('Alternatively, you can try entering a Token manually in the "Advanced Settings" section.'));
	  }
	  return '';
	}

	const PREFIX = '[UNDISCORD]';

	// -------------------------- User interface ------------------------------- //

	// links
	const HOME = 'https://github.com/moequan0v0/dc-autopurge';
	const WIKI = 'https://github.com/moequan0v0/dc-autopurge/wiki';

	const undiscordCore = new UndiscordCore();

	const ui = {
	  undiscordWindow: null,
	  undiscordBtn: null,
	  logArea: null,
	  autoScroll: null,

	  // progress handler
	  progressMain: null,
	  progressIcon: null,
	  percent: null,
	};
	const $ = s => ui.undiscordWindow.querySelector(s);

	function initUI() {

	  messagePicker.init();
	  messagePicker.setLocale(getLocale());

	  insertCss(themeCss);
	  insertCss(mainCss);
	  insertCss(dragCss);

	  // create undiscord window
	  const undiscordUI = replaceInterpolations(undiscordTemplate, {
	    VERSION,
	    HOME,
	    WIKI,
	  });
	  ui.undiscordWindow = createElm(undiscordUI);
	  localizeTree(ui.undiscordWindow, getLocale());
	  document.body.appendChild(ui.undiscordWindow);

	  // enable drag and resize on undiscord window
	  new DragResize({ elm: ui.undiscordWindow, moveHandle: $('.header') });

	  // floating action button — draggable; a tap (not a drag) toggles the panel.
	  // No toolbar mount: Discord changes its DOM too often.
	  ui.undiscordBtn = createElm(buttonHtml);
	  localizeTree(ui.undiscordBtn, getLocale());
	  document.body.appendChild(ui.undiscordBtn);
	  restoreFabPos();
	  let fabDrag = null;
	  ui.undiscordBtn.addEventListener('pointerdown', (e) => {
	    if (e.pointerType === 'mouse' && e.button !== 0) return;
	    const rect = ui.undiscordBtn.getBoundingClientRect();
	    fabDrag = { startX: e.clientX, startY: e.clientY, origX: rect.left, origY: rect.top, moved: false };
	    ui.undiscordBtn.setPointerCapture(e.pointerId);
	  });
	  ui.undiscordBtn.addEventListener('pointermove', (e) => {
	    if (!fabDrag) return;
	    const dx = e.clientX - fabDrag.startX;
	    const dy = e.clientY - fabDrag.startY;
	    if (!fabDrag.moved && Math.hypot(dx, dy) < 5) return; // treat as click until it really moves
	    fabDrag.moved = true;
	    ui.undiscordBtn.classList.add('dragging');
	    const btn = ui.undiscordBtn;
	    btn.style.left = Math.min(Math.max(0, fabDrag.origX + dx), window.innerWidth - btn.offsetWidth) + 'px';
	    btn.style.top = Math.min(Math.max(0, fabDrag.origY + dy), window.innerHeight - btn.offsetHeight) + 'px';
	    btn.style.right = 'auto';
	    btn.style.bottom = 'auto';
	  });
	  const fabPointerEnd = () => {
	    if (!fabDrag) return;
	    const wasTap = !fabDrag.moved;
	    fabDrag = null;
	    ui.undiscordBtn.classList.remove('dragging');
	    if (wasTap) toggleWindow();
	    else saveFabPos();
	  };
	  ui.undiscordBtn.addEventListener('pointerup', fabPointerEnd);
	  ui.undiscordBtn.addEventListener('pointercancel', () => { fabDrag = null; ui.undiscordBtn.classList.remove('dragging'); });
	  ui.undiscordBtn.onkeydown = (e) => {
	    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleWindow(); }
	  };
	  const FAB_POS_KEY = 'dc-autopurge-fab-pos';
	  function saveFabPos() {
	    try {
	      const r = ui.undiscordBtn.getBoundingClientRect();
	      localStorage.setItem(FAB_POS_KEY, JSON.stringify({ x: Math.round(r.left), y: Math.round(r.top) }));
	    } catch { /* storage may be unavailable */ }
	  }
	  function restoreFabPos() {
	    try {
	      const pos = JSON.parse(localStorage.getItem(FAB_POS_KEY) || 'null');
	      if (pos && typeof pos.x === 'number' && typeof pos.y === 'number') {
	        const btn = ui.undiscordBtn;
	        btn.style.left = Math.min(Math.max(0, pos.x), window.innerWidth - btn.offsetWidth) + 'px';
	        btn.style.top = Math.min(Math.max(0, pos.y), window.innerHeight - btn.offsetHeight) + 'px';
	        btn.style.right = 'auto';
	        btn.style.bottom = 'auto';
	      }
	    } catch { /* ignore bad stored data */ }
	  }

	  function toggleWindow() {
	    const willOpen = ui.undiscordWindow.style.display === 'none';
	    ui.undiscordWindow.style.display = willOpen ? '' : 'none';
	    ui.undiscordBtn.classList.toggle('open', willOpen);
	  }

	  // cached elements
	  ui.logArea = $('#logArea');
	  ui.autoScroll = $('#autoScroll');
	  ui.progressMain = $('#progressBar');
	  ui.progressIcon = ui.undiscordBtn.querySelector('progress');
	  ui.percent = $('#progressPercent');

	  // register event listeners
	  $('#hide').onclick = toggleWindow;
	  const languageSelect = $('#language');
	  languageSelect.value = getLocale();
	  languageSelect.onchange = () => {
	    const selectedLocale = setLocale(languageSelect.value);
	    localizeTree(ui.undiscordWindow, selectedLocale);
	    localizeTree(ui.undiscordBtn, selectedLocale);
	    messagePicker.setLocale(selectedLocale);
	    languageSelect.value = selectedLocale;
	  };
	  const captureNativeHeaders = $('input#captureNativeHeaders');
	  captureNativeHeaders.checked = getRequestProfileCaptureEnabled();
	  captureNativeHeaders.onchange = () => {
	    const enabled = setRequestProfileCaptureEnabled(captureNativeHeaders.checked);
	    log.info(t(enabled
	      ? 'Experimental request-header capture enabled for this tab.'
	      : 'Experimental request-header capture disabled; captured values cleared.'
	    ));
	  };
	  $('#toggleSidebar').onclick = ()=> ui.undiscordWindow.classList.toggle('hide-sidebar');
	  $('button#start').onclick = startAction;
	  $('button#stop').onclick = stopAction;
	  $('button#clear').onclick = () => ui.logArea.innerHTML = '';
	  $('button#getAuthor').onclick = () => $('input#authorId').value = getAuthorId();
	  $('button#getGuild').onclick = () => {
	    const guildId = $('input#guildId').value = getGuildId();
	    if (guildId === '@me') $('input#channelId').value = getChannelId();
	  };
	  $('button#getChannel').onclick = () => {
	    $('input#channelId').value = getChannelId();
	    $('input#guildId').value = getGuildId();
	  };
	  $('#redact').onchange = () => {
	    const b = ui.undiscordWindow.classList.toggle('redact');
	    if (b) alert(t('This mode will attempt to hide personal information, so you can screen share / take screenshots.\nAlways double check you are not sharing sensitive information!'));
	  };
	  $('#pickMessageAfter').onclick = async () => {
	    alert(t('Select a message on the chat.\nThe message below it will be deleted.'));
	    toggleWindow();
	    const id = await messagePicker.grab('after');
	    if (id) $('input#minId').value = id;
	    toggleWindow();
	  };
	  $('#pickMessageBefore').onclick = async () => {
	    alert(t('Select a message on the chat.\nThe message above it will be deleted.'));
	    toggleWindow();
	    const id = await messagePicker.grab('before');
	    if (id) $('input#maxId').value = id;
	    toggleWindow();
	  };
	  $('button#getToken').onclick = () => $('input#token').value = fillToken();

	  // sync delays
	  $('input#searchDelay').onchange = (e) => {
	    const v = parseInt(e.target.value);
	    if (v) undiscordCore.options.searchDelay = v;
	  };
	  $('input#deleteDelay').onchange = (e) => {
	    const v = parseInt(e.target.value);
	    if (v) undiscordCore.options.deleteDelay = v;
	  };

	  $('input#searchDelay').addEventListener('input', (event) => {
	    $('div#searchDelayValue').textContent = event.target.value + 'ms';
	  });
	  $('input#deleteDelay').addEventListener('input', (event) => {
	    $('div#deleteDelayValue').textContent = event.target.value + 'ms';
	  });

	  // import json
	  const fileSelection = $('input#importJsonInput');
	  fileSelection.onchange = async () => {
	    const files = fileSelection.files;

	    // No files added
	    if (files.length === 0) return log.warn(t('No file selected.'));

	    // Get channel id field to set it later
	    const channelIdField = $('input#channelId');

	    // Force the guild id to be ourself (@me)
	    const guildIdField = $('input#guildId');
	    guildIdField.value = '@me';

	    // Set author id in case its not set already
	    $('input#authorId').value = getAuthorId();
	    try {
	      const file = files[0];
	      const text = await file.text();
	      const json = JSON.parse(text);
	      const channelIds = Object.keys(json);
	      channelIdField.value = channelIds.join(',');
	      log.info(t('Loaded {{count}} channels.', { count: channelIds.length }));
	    } catch(err) {
	      log.error(t('Error parsing file!'), err);
	    }
	  };

	  // redirect console logs to inside the window after setting up the UI
	  setLogFn(printLog);

	  setupUndiscordCore();
	}

	function printLog(type = '', args) {
	  const line = document.createElement('div');
	  line.className = `log log-${type}`;
	  Array.from(args).forEach((value, index) => {
	    if (index) line.appendChild(document.createTextNode('\t'));
	    const text = typeof value === 'object'
	      ? JSON.stringify(value, value instanceof Error && Object.getOwnPropertyNames(value))
	      : String(value);
	    appendSafeLogMarkup(line, text);
	  });
	  ui.logArea.appendChild(line);
	  if (ui.autoScroll.checked) line.scrollIntoView(false);
	  if (type==='error') console.error(PREFIX, ...Array.from(args));
	}

	function appendSafeLogMarkup(parent, markup) {
	  const template = document.createElement('template');
	  template.innerHTML = markup;
	  const allowedTags = new Set(['X', 'SUP', 'B', 'I', 'BR']);

	  function copyNode(node, target) {
	    if (node.nodeType === Node.TEXT_NODE) {
	      target.appendChild(document.createTextNode(node.nodeValue));
	      return;
	    }
	    if (node.nodeType !== Node.ELEMENT_NODE) return;
	    if (!allowedTags.has(node.tagName)) {
	      target.appendChild(document.createTextNode(node.textContent || ''));
	      return;
	    }
	    const clean = document.createElement(node.tagName.toLowerCase());
	    for (const child of node.childNodes) copyNode(child, clean);
	    target.appendChild(clean);
	  }

	  for (const node of template.content.childNodes) copyNode(node, parent);
	}

	function setupUndiscordCore() {

	  undiscordCore.onStart = (state, stats) => {
	    $('#start').disabled = true;
	    $('#stop').disabled = false;

	    ui.undiscordBtn.classList.add('running');
	    ui.progressMain.style.display = 'block';
	    ui.percent.style.display = 'block';
	  };

	  undiscordCore.onProgress = (state, stats) => {
	    // console.log(PREFIX, 'onProgress', state, stats);
	    let max = state.grandTotal;
	    const value = state.delCount + state.failCount;
	    max = Math.max(max, value, 0); // clamp max

	    // status bar
	    const percent = value >= 0 && max ? Math.round(value / max * 100) + '%' : '';
	    const elapsed = msToHMS(Date.now() - stats.startTime.getTime());
	    const remaining = msToHMS(stats.etr);
	    ui.percent.textContent = `${percent} (${value}/${max}) ${t('Elapsed: {{elapsed}} Remaining: {{remaining}}', { elapsed, remaining })}`;

	    ui.progressIcon.value = value;
	    ui.progressMain.value = value;

	    // indeterminate progress bar
	    if (max) {
	      ui.progressIcon.setAttribute('max', max);
	      ui.progressMain.setAttribute('max', max);
	    } else {
	      ui.progressIcon.removeAttribute('value');
	      ui.progressMain.removeAttribute('value');
	      ui.percent.textContent = '...';
	    }

	    // update delays
	    const searchDelayInput = $('input#searchDelay');
	    searchDelayInput.value = undiscordCore.options.searchDelay;
	    $('div#searchDelayValue').textContent = undiscordCore.options.searchDelay+'ms';

	    const deleteDelayInput = $('input#deleteDelay');
	    deleteDelayInput.value = undiscordCore.options.deleteDelay;
	    $('div#deleteDelayValue').textContent = undiscordCore.options.deleteDelay+'ms';
	  };

	  undiscordCore.onStop = (state, stats) => {
	    $('#start').disabled = false;
	    $('#stop').disabled = true;
	    ui.undiscordBtn.classList.remove('running');
	    ui.progressMain.style.display = 'none';
	    ui.percent.style.display = 'none';
	  };
	}

	async function startAction() {
	  // general
	  const authorId = $('input#authorId').value.trim();
	  const guildId = $('input#guildId').value.trim();
	  const channelIds = $('input#channelId').value.trim().split(/\s*,\s*/);
	  const includeNsfw = $('input#includeNsfw').checked;
	  // filter
	  const content = $('input#search').value.trim();
	  const hasLink = $('input#hasLink').checked;
	  const hasFile = $('input#hasFile').checked;
	  const includePinned = $('input#includePinned').checked;
	  const pattern = $('input#pattern').value;
	  // message interval
	  const minId = $('input#minId').value.trim();
	  const maxId = $('input#maxId').value.trim();
	  // date range
	  const minDate = $('input#minDate').value.trim();
	  const maxDate = $('input#maxDate').value.trim();
	  //advanced
	  const searchDelay = parseInt($('input#searchDelay').value.trim());
	  const deleteDelay = parseInt($('input#deleteDelay').value.trim());
	  const variableTiming = $('input#variableTiming').checked;
	 
	  // token
	  const authToken = $('input#token').value.trim() || fillToken();
	  if (!authToken) return; // get token already logs an error.
	  
	  // validate input
	  if (!guildId) return log.error(t('You must fill the "Server ID" field!'));
	 
	  // clear logArea
	  ui.logArea.innerHTML = '';

	  undiscordCore.resetState();
	  undiscordCore.options = {
	    ...undiscordCore.options,
	    authToken,
	    authorId,
	    guildId,
	    channelId: channelIds.length === 1 ? channelIds[0] : undefined, // single or multiple channel
	    minId: minId || minDate,
	    maxId: maxId || maxDate,
	    content,
	    hasLink,
	    hasFile,
	    includeNsfw,
	    includePinned,
	    pattern,
	    searchDelay,
	    deleteDelay,
	    variableTiming,
	    // maxAttempt: 2,
	  };
	  if (channelIds.length > 1) {
	    const jobs = channelIds.map(ch => ({
	      guildId: guildId,
	      channelId: ch,
	    }));

	    try {
	      await undiscordCore.runBatch(jobs);
	    } catch (err) {
	      log.error(t('CoreException'), err);
	    }
	  }
	  // single channel
	  else {
	    try {
	      await undiscordCore.run();
	    } catch (err) {
	      log.error(t('CoreException'), err);
	      undiscordCore.stop();
	    }
	  }
	}

	function stopAction() {
	  console.log(PREFIX, 'stopAction');
	  undiscordCore.stop();
	}

	// ---- END Undiscord ----

	initializeRequestProfileCapture();
	if (document.body) initUI();
	else document.addEventListener('DOMContentLoaded', initUI, { once: true });

})();
