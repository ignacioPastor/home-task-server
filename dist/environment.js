"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Environment {
}
Environment.port = 3005;
Environment.isStaging = Boolean(process.env.staging); // Original line doesn't include the Boolean constructor
exports.Environment = Environment;
